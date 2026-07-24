from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
import datetime as dt

# Adjust these imports based on your project structure
import models
import schemas
from database import get_db
from utils.email_sender import send_email

router = APIRouter(
    prefix="/contacts",
    tags=["Contacts"]
)

@router.post("/", response_model=schemas.ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(contact: schemas.ContactCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Create a new contact in the database.
    Takes in name, email, budget, need, and details.
    """
    # Create a new Contact SQLAlchemy model instance
    db_contact = models.Contact(**contact.model_dump())
    
    # Add to session and commit to the database
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    
    # Check if this email has already received the automated response
    automated_subject = "We've received your request - Krintix"
    existing_email = db.query(models.ClientEmail).filter(
        models.ClientEmail.recipient_email == db_contact.email,
        models.ClientEmail.subject == automated_subject
    ).first()

    if not existing_email:
        admin = db.query(models.Admin).first()
        if admin:
            body = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a202c;">
                <h2 style="color: #0f172a;">Hello {db_contact.name},</h2>
                <p style="font-size: 16px; line-height: 1.6;">
                    Thank you for reaching out to Krintix. Your response has been securely noted, and our engineering team is currently reviewing your details.
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                    Whether you are looking to architect for scale, optimize cloud efficiency, or integrate advanced telemetry, we are committed to providing you with absolute empirical clarity. 
                    <strong>Please expect a personalized reply from our team within 24-48 hours.</strong>
                </p>
                <p style="font-size: 16px; line-height: 1.6;">
                    In the meantime, feel free to explore our latest engineering <a href="https://krintix.com/insights" style="color: #eab308; font-weight: bold;">insights and journal</a>.
                </p>
                <br>
                <p style="font-size: 16px; margin-bottom: 0;">Best regards,</p>
                <p style="font-size: 16px; font-weight: bold; margin-top: 5px; color: #0f172a;">The Krintix Team</p>
            </div>
            """
            
            # Schedule email sending
            background_tasks.add_task(send_email, db_contact.email, automated_subject, body)

            # Log into client_email
            db_email_log = models.ClientEmail(
                admin_id=admin.id,
                contact_id=db_contact.id,
                recipient_email=db_contact.email,
                subject=automated_subject,
                body=body,
                sent_at=dt.datetime.utcnow()
            )
            db.add(db_email_log)
            db.commit()

    return db_contact

@router.get("/", response_model=List[schemas.ContactResponse])
def get_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Fetch a list of contacts from the database.
    Returns id, name, email, budget, need, and details.
    """
    # Query the contacts table
    contacts = db.query(models.Contact).offset(skip).limit(limit).all()
    return contacts

@router.get("/{contact_id}", response_model=schemas.ContactResponse)
def get_contact_by_id(contact_id: int, db: Session = Depends(get_db)):
    """
    Fetch a specific contact by their ID.
    """
    contact = db.query(models.Contact).filter(models.Contact.id == contact_id).first()
    
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
        
    return contact