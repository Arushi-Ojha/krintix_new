from pydantic import BaseModel, ConfigDict, EmailStr
from typing import List
import datetime as dt

# Import the Enum from our models
from models import AttendanceStatus

# ---------------------------------------------------------
# CONTACT SCHEMAS
# ---------------------------------------------------------
class ContactBase(BaseModel):
    name: str
    email: EmailStr
    budget: str | None = None
    need: str | None = None
    details: str | None = None

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    budget: str | None = None
    need: str | None = None
    details: str | None = None

class ContactResponse(ContactBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

# ---------------------------------------------------------
# ATTENDANCE SCHEMAS
# ---------------------------------------------------------
class AttendanceBase(BaseModel):
    # Fixed: Using dt.date prevents the NoneType collision error
    date: dt.date 
    employee_id: int
    logged_in: dt.datetime | None = None
    logged_out: dt.datetime | None = None
    report: str | None = None
    status: AttendanceStatus = AttendanceStatus.ASSIGNED

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceUpdate(BaseModel):
    # Fixed: Using dt.date prevents the NoneType collision error
    date: dt.date | None = None
    employee_id: int | None = None
    logged_in: dt.datetime | None = None
    logged_out: dt.datetime | None = None
    report: str | None = None
    status: AttendanceStatus | None = None

class AttendanceResponse(AttendanceBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

# ---------------------------------------------------------
# EMPLOYEE SCHEMAS
# ---------------------------------------------------------
class EmployeeBase(BaseModel):
    name: str
    picture: str | None = None
    email: EmailStr
    present: int = 0
    absent: int = 0
    role: str | None = None
    joining_date: dt.date | None = None
    current_assignments: str | None = None
    assignment_due: dt.date | None = None

class EmployeeCreate(EmployeeBase):
    password: str

class EmployeeUpdate(BaseModel):
    name: str | None = None
    picture: str | None = None
    email: EmailStr | None = None
    password: str | None = None  
    present: int | None = None
    absent: int | None = None
    role: str | None = None
    joining_date: dt.date | None = None
    current_assignments: str | None = None
    assignment_due: dt.date | None = None

class EmployeeResponse(EmployeeBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class EmployeeWithAttendanceResponse(EmployeeResponse):
    attendance_records: List[AttendanceResponse] = []

class EmployeeLogin(BaseModel):
    email: EmailStr
    password: str

class EmployeeLogout(BaseModel):
    report: str
    status: AttendanceStatus

# ---------------------------------------------------------
# ADMIN SCHEMAS
# ---------------------------------------------------------
class AdminBase(BaseModel):
    name: str
    email: EmailStr
    logged_in: dt.datetime | None = None
    picture: str | None = None

class AdminCreate(AdminBase):
    password: str

class AdminUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None
    picture: str | None = None

class AdminResponse(AdminBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
    
class AdminLogin(BaseModel):
    email: EmailStr
    password: str

# ---------------------------------------------------------
# EMAIL SCHEMAS
# ---------------------------------------------------------
class CustomEmailRequest(BaseModel):
    contact_ids: List[int]
    subject: str
    body: str

class EmailResponse(BaseModel):
    id: int
    admin_id: int
    contact_id: int | None = None
    recipient_email: str
    subject: str
    body: str
    sent_at: dt.datetime | None = None
    model_config = ConfigDict(from_attributes=True)

# ---------------------------------------------------------
# MEETING SCHEMAS
# ---------------------------------------------------------
class MeetingBase(BaseModel):
    contact_id: int
    title: str
    description: str | None = None
    scheduled_at: dt.datetime
    duration_minutes: int = 30

class MeetingCreate(MeetingBase):
    pass

class MeetingUpdate(BaseModel):
    scheduled_at: dt.datetime

class MeetingResponse(MeetingBase):
    id: int
    admin_id: int
    meeting_link: str | None = None
    status: str
    created_at: dt.datetime | None = None
    model_config = ConfigDict(from_attributes=True)

# ---------------------------------------------------------
# ARTICLE SCHEMAS
# ---------------------------------------------------------
class ArticleBase(BaseModel):
    admin_id: int | None = None
    category: str
    topic: str
    detail: str
    read_minutes: int | None = None
    published_date: dt.date
    published_time: dt.time

class ArticleCreate(ArticleBase):
    pass

class ArticleResponse(ArticleBase):
    id: int
    created_at: dt.datetime | None = None
    model_config = ConfigDict(from_attributes=True)

# ---------------------------------------------------------
# SUBSCRIPTION SCHEMAS
# ---------------------------------------------------------
class WebsiteSubscriptionBase(BaseModel):
    email: EmailStr

class WebsiteSubscriptionCreate(WebsiteSubscriptionBase):
    pass

class WebsiteSubscriptionResponse(WebsiteSubscriptionBase):
    id: int
    subscribed_at: dt.datetime | None = None
    status: str
    model_config = ConfigDict(from_attributes=True)
