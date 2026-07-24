import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_APP_PASSWORD") # App password, not regular password
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))

def send_email(to_email: str, subject: str, body: str):
    """
    Sends an email using standard SMTP.
    This function blocks, so it should be run via FastAPI BackgroundTasks.
    """
    if not EMAIL_HOST_USER or not EMAIL_HOST_PASSWORD:
        print(f"Skipping email to {to_email}. Missing EMAIL_HOST_USER or EMAIL_APP_PASSWORD in .env")
        return

    msg = MIMEMultipart()
    msg['From'] = EMAIL_HOST_USER
    msg['To'] = to_email
    msg['Subject'] = subject
    
    msg.attach(MIMEText(body, 'html'))
    
    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        server.send_message(msg)
        server.quit()
        print(f"Successfully sent email to {to_email}")
    except Exception as e:
        print(f"Failed to send email to {to_email}. Error: {e}")
