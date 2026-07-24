from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
import datetime as dt

import models
import schemas
from database import get_db
from utils.email_sender import send_email

router = APIRouter(
    prefix="/emails",
    tags=["Emails"]
)

@router.post("/send-custom", status_code=status.HTTP_200_OK)
def send_custom_email(request: schemas.CustomEmailRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Send a custom email to a list of contacts.
    For demonstration, we attribute this to the first admin in the DB.
    """
    admin = db.query(models.Admin).first()
    if not admin:
        raise HTTPException(status_code=400, detail="No admin found to attribute email to.")

    contacts = db.query(models.Contact).filter(models.Contact.id.in_(request.contact_ids)).all()
    
    if not contacts:
        raise HTTPException(status_code=404, detail="No valid contacts found for the provided IDs.")

    for contact in contacts:
        # Schedule the email sending in the background
        background_tasks.add_task(send_email, contact.email, request.subject, request.body)

        # Log into client_email
        db_email = models.ClientEmail(
            admin_id=admin.id,
            contact_id=contact.id,
            recipient_email=contact.email,
            subject=request.subject,
            body=request.body,
            sent_at=dt.datetime.utcnow()
        )
        db.add(db_email)

    db.commit()

    return {"message": f"Queued custom email to {len(contacts)} contacts."}
