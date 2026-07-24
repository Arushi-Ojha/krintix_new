from apscheduler.schedulers.background import BackgroundScheduler
from datetime import date, datetime
from sqlalchemy.orm import Session

# Adjust these imports based on your project structure
import models
from database import SessionLocal

def mark_absentees_for_today():
    """
    Background job that runs at 11:59 PM to mark employees absent 
    if they did not log in that day.
    """
    today = date.today()

    # 0 = Monday, 5 = Saturday, 6 = Sunday. 
    # (Removed Sunday block to count weekends)

    # Create a fresh database session specifically for this background task
    db: Session = SessionLocal()
    
    try:
        # 1. Get all employees
        employees = db.query(models.Employee).all()

        # 2. Get all attendance records for today
        today_attendances = db.query(models.Attendance).filter(
            models.Attendance.date == today
        ).all()

        # 3. Handle employees who logged in today
        present_employee_ids = set()
        
        for record in today_attendances:
            present_employee_ids.add(record.employee_id)
            
            # If they haven't logged out yet, auto-logout
            if not record.logged_out:
                now = datetime.now()
                record.logged_out = now
                record.report = "Auto-logged out by system."
                record.status = models.AttendanceStatus.COMPLETED
                
                # Calculate hours worked for auto-logout
                time_worked = now - record.logged_in
                hours_worked = time_worked.total_seconds() / 3600
                
                employee = db.query(models.Employee).filter(models.Employee.id == record.employee_id).first()
                if employee:
                    if hours_worked >= 1.0:
                        employee.present = (employee.present or 0) + 1
                    else:
                        employee.absent = (employee.absent or 0) + 1

        # 4. Loop through all employees. If their ID isn't in the present list, mark absent.
        for employee in employees:
            if employee.id not in present_employee_ids:
                employee.absent = (employee.absent or 0) + 1

        # Commit all the marks to the database at once
        db.commit()
        print(f"[{datetime.now()}] Automated Task: Auto-logouts and absentees marked successfully for {today}.")
        
    except Exception as e:
        print(f"Error running absentee background task: {e}")
        db.rollback()
    finally:
        # Always close the session to free up database connections
        db.close()

def start_scheduler():
    """
    Initializes and starts the background scheduler.
    """
    scheduler = BackgroundScheduler()
    
    # Schedule the job to run every day using 'cron' style timing 
    # hour=23, minute=59 means it runs at 11:59 PM exactly.
    scheduler.add_job(mark_absentees_for_today, 'cron', hour=23, minute=59)
    
    scheduler.start()