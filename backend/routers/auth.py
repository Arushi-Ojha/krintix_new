import os
import smtplib
import random
import string
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from dotenv import load_dotenv

import models
from database import get_db

# Load environment variables
load_dotenv()
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_APP_PASSWORD = os.getenv("EMAIL_APP_PASSWORD")

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory storage for pending signups (In production, use Redis or a DB table)
pending_signups = {}

# ---------------------------------------------------------
# SCHEMAS FOR AUTHENTICATION
# ---------------------------------------------------------
class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

# ---------------------------------------------------------
# HELPER FUNCTIONS
# ---------------------------------------------------------
def send_email(to_email: str, subject: str, body: str):
    """Utility function to send an email using Gmail SMTP"""
    if not EMAIL_HOST_USER or not EMAIL_APP_PASSWORD:
        raise HTTPException(status_code=500, detail="Email credentials not configured in .env")

    msg = MIMEMultipart()
    msg['From'] = EMAIL_HOST_USER
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_APP_PASSWORD)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email")

def generate_random_password(length=8):
    """Generates a random alphanumeric password"""
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

# ---------------------------------------------------------
# ENDPOINTS
# ---------------------------------------------------------

@router.post("/signup/request-otp")
def request_signup_otp(data: SignupRequest, db: Session = Depends(get_db)):
    """Validates passwords, generates an OTP, and emails it to the user."""
    if data.password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
        
    # Check if user already exists
    existing_user = db.query(models.Employee).filter(models.Employee.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already registered")

    # Generate a 6-digit OTP
    otp = str(random.randint(100000, 999999))
    
    # Hash the password now so we don't store plain text in memory
    hashed_password = pwd_context.hash(data.password)

    # Store temporarily
    pending_signups[data.email] = {
        "password": hashed_password,
        "otp": otp
    }

    # Send the email
    subject = "Your Verification OTP"
    body = f"Hello,\n\nYour OTP for signup is: {otp}\n\nPlease enter this to complete your registration."
    send_email(data.email, subject, body)

    return {"message": "OTP sent to email successfully"}

@router.post("/signup/verify-otp")
def verify_signup_otp(data: VerifyOTPRequest, db: Session = Depends(get_db)):
    """Verifies the OTP and creates the actual user in the database."""
    pending_data = pending_signups.get(data.email)
    
    if not pending_data:
        raise HTTPException(status_code=400, detail="No pending signup found for this email")
        
    if pending_data["otp"] != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
        
    # Extract a default name from the email (e.g., "john" from "john@example.com")
    default_name = data.email.split('@')[0]
        
    # Create the user in the database
    new_employee = models.Employee(
        name=default_name,
        email=data.email,
        password=pending_data["password"]
    )
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    # Clear the temporary memory
    del pending_signups[data.email]

    return {"message": "Signup successful. You can now log in.", "employee_id": new_employee.id}

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    """Logs the user in by checking their email and password."""
    employee = db.query(models.Employee).filter(models.Employee.email == data.email).first()
    
    if not employee or not pwd_context.verify(data.password, employee.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    return {"message": "Login successful", "employee_id": employee.id, "name": employee.name}

@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """Generates a new password, saves it to the database, and emails it to the user."""
    employee = db.query(models.Employee).filter(models.Employee.email == data.email).first()
    
    if not employee:
        # We still return a generic success message to prevent attackers from guessing registered emails
        return {"message": "If that email is in our system, a new password has been sent to it."}

    # Generate new password
    new_password = generate_random_password()
    
    # Hash and save to DB
    employee.password = pwd_context.hash(new_password)
    db.commit()

    # Send the email
    subject = "Your New Password"
    body = f"Hello {employee.name},\n\nYour password has been reset.\nYour new password is: {new_password}\n\nPlease log in and change this password immediately."
    send_email(data.email, subject, body)

    return {"message": "If that email is in our system, a new password has been sent to it."}