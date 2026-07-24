from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import datetime, date
# Adjust these imports based on your project structure
import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

# Setup for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

@router.get("/{employee_id}", response_model=schemas.EmployeeResponse)
def get_employee_profile(employee_id: int, db: Session = Depends(get_db)):
    """
    Fetch an employee's profile details.
    Returns picture, id, name, email, present, absent, role, joining date, assignments, and due date.
    """
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    
    if employee is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
        
    return employee

@router.patch("/{employee_id}", response_model=schemas.EmployeeResponse)
def update_employee_profile(
    employee_id: int, 
    update_data: schemas.EmployeeUpdate, 
    db: Session = Depends(get_db)
):
    """
    Let employees edit their picture, name, email, and password.
    Uses PATCH so you only need to send the fields you actually want to change.
    """
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    
    if employee is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    
    # Extract only the fields provided in the request body
    update_dict = update_data.model_dump(exclude_unset=True)
    
    # Update this line in routers/employee.py
    allowed_fields = {
        "name", "email", "picture", "password", 
        "role"
    }
    
    for key, value in update_dict.items():
        if key in allowed_fields:
            # If the user is updating their password, hash it before saving
            if key == "password":
                hashed_password = get_password_hash(value)
                setattr(employee, key, hashed_password)
            else:
                setattr(employee, key, value)
                
    db.commit()
    db.refresh(employee)
    
    return employee

@router.post("/{employee_id}/attendance/login", status_code=status.HTTP_200_OK)
def mark_login(employee_id: int, db: Session = Depends(get_db)):
    """
    Marks the employee as logged in for the current day.
    Captures the exact current date and time.
    """
    today = date.today()
    
    # Check if a record already exists for today
    existing_attendance = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id,
        models.Attendance.date == today
    ).first()
    
    if existing_attendance:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Employee has already logged in today."
        )
        
    new_attendance = models.Attendance(
        employee_id=employee_id,
        date=today,
        logged_in=datetime.now(),
        status=models.AttendanceStatus.IN_PROGRESS
    )
    
    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)
    
    return {"message": "Logged in successfully", "logged_in_at": new_attendance.logged_in}


@router.put("/{employee_id}/attendance/logout", status_code=status.HTTP_200_OK)
def mark_logout(
    employee_id: int, 
    logout_data: schemas.EmployeeLogout, 
    db: Session = Depends(get_db)
):
    """
    Marks the employee as logged out, accepts a report and status update.
    Calculates hours worked and updates present/absent days for Mon-Sat.
    """
    today = date.today()
    
    # Fetch today's attendance record
    attendance = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id,
        models.Attendance.date == today
    ).first()
    
    if not attendance or not attendance.logged_in:
        raise HTTPException(status_code=400, detail="No active login found for today.")
        
    if attendance.logged_out:
        raise HTTPException(status_code=400, detail="Employee has already logged out today.")

    # 1. Update Attendance Record
    now = datetime.now()
    attendance.logged_out = now
    attendance.report = logout_data.report
    attendance.status = logout_data.status

    # 2. Calculate hours worked
    time_worked = now - attendance.logged_in
    hours_worked = time_worked.total_seconds() / 3600  # Convert seconds to hours

    # 3. Update Employee Present/Absent counts
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    
    if hours_worked >= 1.0:
        employee.present = (employee.present or 0) + 1
    else:
        # They logged in, but left before 1 hour was complete.
        employee.absent = (employee.absent or 0) + 1
            
    db.commit()
    
    return {
        "message": "Logged out successfully",
        "hours_worked": round(hours_worked, 2),
        "report_submitted": attendance.report,
        "assignment_status": attendance.status
    }