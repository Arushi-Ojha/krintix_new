import uuid
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
import datetime as dt
import os.path
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

import models
import schemas
from database import get_db
from utils.email_sender import send_email

router = APIRouter(
    prefix="/meetings",
    tags=["Meetings"]
)

def generate_mock_meet_link():
    """Generates a random mock Google Meet link"""
    random_str = str(uuid.uuid4()).replace("-", "")
    return f"https://meet.google.com/{random_str[:3]}-{random_str[3:7]}-{random_str[7:10]}"

def create_google_meet_link(title, description, start_time, duration_minutes, admin_email, contact_email):
    """Creates a real Google Meet link if token.json exists, otherwise returns mock link."""
    if not os.path.exists('token.json'):
        return generate_mock_meet_link()
    
    try:
        creds = Credentials.from_authorized_user_file('token.json', ['https://www.googleapis.com/auth/calendar.events'])
        service = build('calendar', 'v3', credentials=creds)

        end_time = start_time + dt.timedelta(minutes=duration_minutes)

        event = {
            'summary': title,
            'description': description,
            'start': {
                'dateTime': start_time.isoformat(),
            },
            'end': {
                'dateTime': end_time.isoformat(),
            },
            'attendees': [
                {'email': admin_email},
                {'email': contact_email},
            ],
            'conferenceData': {
                'createRequest': {
                    'requestId': f"{uuid.uuid4().hex}",
                    'conferenceSolutionKey': {'type': 'hangoutsMeet'}
                }
            },
        }

        # create the event
        created_event = service.events().insert(
            calendarId='primary', 
            body=event, 
            conferenceDataVersion=1,
            sendUpdates='all'
        ).execute()
        
        return created_event.get('hangoutLink') or generate_mock_meet_link()
    except Exception as e:
        print(f"Failed to create Google Meet link: {e}")
        return generate_mock_meet_link()

@router.post("/", response_model=schemas.MeetingResponse, status_code=status.HTTP_201_CREATED)
def book_meeting(request: schemas.MeetingCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Books a meeting with a contact, generates a mock Google Meet link, 
    and sends email notifications to both admin and contact.
    """
    admin = db.query(models.Admin).first()
    if not admin:
        raise HTTPException(status_code=400, detail="No admin found to host the meeting.")

    contact = db.query(models.Contact).filter(models.Contact.id == request.contact_id).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found.")

    meet_link = create_google_meet_link(
        request.title, 
        request.description, 
        request.scheduled_at, 
        request.duration_minutes, 
        admin.email, 
        contact.email
    )

    db_meeting = models.ClientMeeting(
        admin_id=admin.id,
        contact_id=contact.id,
        title=request.title,
        description=request.description,
        scheduled_at=request.scheduled_at,
        duration_minutes=request.duration_minutes,
        meeting_link=meet_link,
        status=models.MeetingStatus.SCHEDULED,
        created_at=dt.datetime.utcnow()
    )
    
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)

    # Format the time
    time_str = request.scheduled_at.strftime("%Y-%m-%d %H:%M UTC")

    # Email to Contact
    contact_subject = f"Invitation: {request.title}"
    contact_body = f"""
    <h3>Hello {contact.name},</h3>
    <p>A meeting has been scheduled with Krintix.</p>
    <p><strong>Title:</strong> {request.title}</p>
    <p><strong>Date & Time:</strong> {time_str}</p>
    <p><strong>Duration:</strong> {request.duration_minutes} minutes</p>
    <p><strong>Meeting Link:</strong> <a href="{meet_link}">{meet_link}</a></p>
    <br>
    <p>Best regards,<br>Krintix Team</p>
    """
    background_tasks.add_task(send_email, contact.email, contact_subject, contact_body)

    # Email to Admin
    admin_subject = f"New Meeting Booked: {request.title}"
    admin_body = f"""
    <h3>Meeting Scheduled</h3>
    <p>You have a new meeting scheduled with {contact.name} ({contact.email}).</p>
    <p><strong>Title:</strong> {request.title}</p>
    <p><strong>Date & Time:</strong> {time_str}</p>
    <p><strong>Meeting Link:</strong> <a href="{meet_link}">{meet_link}</a></p>
    """
    background_tasks.add_task(send_email, admin.email, admin_subject, admin_body)

    return db_meeting

@router.put("/{meeting_id}", response_model=schemas.MeetingResponse)
def reschedule_meeting(meeting_id: int, request: schemas.MeetingUpdate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Reschedules an existing meeting and notifies both parties.
    """
    meeting = db.query(models.ClientMeeting).filter(models.ClientMeeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    admin = db.query(models.Admin).filter(models.Admin.id == meeting.admin_id).first()
    contact = db.query(models.Contact).filter(models.Contact.id == meeting.contact_id).first()

    old_time_str = meeting.scheduled_at.strftime("%Y-%m-%d %H:%M UTC")
    meeting.scheduled_at = request.scheduled_at
    db.commit()
    db.refresh(meeting)

    new_time_str = meeting.scheduled_at.strftime("%Y-%m-%d %H:%M UTC")

    # Notify Contact
    if contact:
        contact_subject = f"Update: Meeting Rescheduled - {meeting.title}"
        contact_body = f"""
        <h3>Hello {contact.name},</h3>
        <p>Your meeting with Krintix has been rescheduled.</p>
        <p><strong>Previous Time:</strong> {old_time_str}</p>
        <p><strong>New Time:</strong> {new_time_str}</p>
        <p><strong>Meeting Link:</strong> <a href="{meeting.meeting_link}">{meeting.meeting_link}</a></p>
        <br>
        <p>Best regards,<br>Krintix Team</p>
        """
        background_tasks.add_task(send_email, contact.email, contact_subject, contact_body)

    # Notify Admin
    if admin:
        admin_subject = f"Meeting Rescheduled: {meeting.title}"
        admin_body = f"""
        <h3>Meeting Rescheduled</h3>
        <p>The meeting with {contact.name if contact else 'Unknown'} has been moved.</p>
        <p><strong>New Time:</strong> {new_time_str}</p>
        """
        background_tasks.add_task(send_email, admin.email, admin_subject, admin_body)

    return meeting
