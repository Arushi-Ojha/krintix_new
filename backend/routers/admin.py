from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from passlib.context import CryptContext
from typing import List

import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---------------------------------------------------------
# CONTACTS MANAGEMENT
# ---------------------------------------------------------

@router.get("/contacts", response_model=List[schemas.ContactResponse])
def get_all_contacts(db: Session = Depends(get_db)):
    """Admin view of all contacts."""
    return db.query(models.Contact).all()

@router.get("/emails", response_model=List[schemas.EmailResponse])
def get_all_emails(db: Session = Depends(get_db)):
    """Admin view of all emails sent."""
    return db.query(models.ClientEmail).order_by(models.ClientEmail.sent_at.desc()).all()

@router.get("/meetings", response_model=List[schemas.MeetingResponse])
def get_all_meetings(db: Session = Depends(get_db)):
    """Admin view of all meetings booked."""
    return db.query(models.ClientMeeting).order_by(models.ClientMeeting.scheduled_at.desc()).all()

# ---------------------------------------------------------
# EMPLOYEE MANAGEMENT
# ---------------------------------------------------------

@router.get("/employees", response_model=List[schemas.EmployeeWithAttendanceResponse])
def get_all_employees(db: Session = Depends(get_db)):
    """
    Admin view of all employees side-by-side with their complete attendance history.
    """
    return db.query(models.Employee).all()

@router.patch("/employees/{employee_id}", response_model=schemas.EmployeeResponse)
def admin_edit_employee(employee_id: int, update_data: schemas.EmployeeUpdate, db: Session = Depends(get_db)):
    """Admin can edit any employee detail."""
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    update_dict = update_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        if key == "password":
            setattr(employee, key, pwd_context.hash(value))
        else:
            setattr(employee, key, value)
            
    db.commit()
    db.refresh(employee)
    return employee

@router.delete("/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def fire_employee(employee_id: int, db: Session = Depends(get_db)):
    """Fire (delete) an employee. Attendance records are auto-deleted via CASCADE."""
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    db.delete(employee)
    db.commit()
    return

# ---------------------------------------------------------
# ADMIN PROFILE & AUTHENTICATION
# ---------------------------------------------------------

@router.post("/login")
def admin_login(login_data: schemas.AdminLogin, db: Session = Depends(get_db)):
    """
    Admin login. Verifies password and sets the logged_in timestamp.
    """
    admin = db.query(models.Admin).filter(models.Admin.email == login_data.email).first()
    
    if not admin or not pwd_context.verify(login_data.password, admin.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    admin.logged_in = datetime.now()
    db.commit()
    
    return {"message": "Admin logged in", "logged_in_since": admin.logged_in}

@router.post("/{admin_id}/logout")
def admin_logout(admin_id: int, db: Session = Depends(get_db)):
    """
    Admin logout. Resets the logged_in timestamp to None (0).
    """
    admin = db.query(models.Admin).filter(models.Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
        
    admin.logged_in = None
    db.commit()
    return {"message": "Admin logged out successfully"}

@router.get("/me/{admin_id}", response_model=schemas.AdminResponse)
def get_admin_profile(admin_id: int, db: Session = Depends(get_db)):
    """View admin's own profile."""
    admin = db.query(models.Admin).filter(models.Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin

@router.patch("/me/{admin_id}", response_model=schemas.AdminResponse)
def edit_admin_profile(admin_id: int, update_data: schemas.AdminUpdate, db: Session = Depends(get_db)):
    """Admin can edit their own picture, name, email, and password."""
    admin = db.query(models.Admin).filter(models.Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
        
    update_dict = update_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        if key == "password":
            setattr(admin, key, pwd_context.hash(value))
        else:
            setattr(admin, key, value)
            
    db.commit()
    db.refresh(admin)
    return admin