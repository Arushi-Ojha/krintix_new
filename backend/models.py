import enum
# We import datetime as 'dt' to shield it from SQLAlchemy bugs
import datetime as dt

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class AttendanceStatus(str, enum.Enum):
    COMPLETED = "COMPLETED"
    IN_PROGRESS = "IN_PROGRESS"
    ASSIGNED = "ASSIGNED"


class Contact(Base):
    __tablename__ = "contact"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    budget: Mapped[str | None] = mapped_column(String(100))
    need: Mapped[str | None] = mapped_column(String(255))
    details: Mapped[str | None] = mapped_column(Text)


class Employee(Base):
    __tablename__ = "employee"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    picture: Mapped[str | None] = mapped_column(String(500))
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    present: Mapped[int] = mapped_column(Integer, default=0)
    absent: Mapped[int] = mapped_column(Integer, default=0)
    role: Mapped[str | None] = mapped_column(String(100))
    
    # Safely using dt.date
    joining_date: Mapped[dt.date | None] 
    current_assignments: Mapped[str | None] = mapped_column(Text)
    assignment_due: Mapped[dt.date | None]

    attendance_records: Mapped[list["Attendance"]] = relationship(
        back_populates="employee"
    )


class Attendance(Base):
    __tablename__ = "attendance"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    
    # Safely using dt.date makes the Boolean TypeError impossible
    date: Mapped[dt.date] = mapped_column(nullable=False)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employee.id"), nullable=False)
    
    # Safely using dt.datetime
    logged_in: Mapped[dt.datetime | None] 
    logged_out: Mapped[dt.datetime | None]
    
    report: Mapped[str | None] = mapped_column(Text)
    status: Mapped[AttendanceStatus] = mapped_column(default=AttendanceStatus.ASSIGNED)

    employee: Mapped["Employee"] = relationship(back_populates="attendance_records")


class Admin(Base):
    __tablename__ = "admin"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False) 
    logged_in: Mapped[dt.datetime | None] 
    picture: Mapped[str | None] = mapped_column(String(500))


class ClientEmail(Base):
    __tablename__ = "client_email"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    admin_id: Mapped[int] = mapped_column(ForeignKey("admin.id", ondelete="CASCADE"), nullable=False)
    contact_id: Mapped[int | None] = mapped_column(ForeignKey("contact.id", ondelete="SET NULL"))
    recipient_email: Mapped[str] = mapped_column(String(255), nullable=False)
    subject: Mapped[str] = mapped_column(String(255), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    sent_at: Mapped[dt.datetime | None] = mapped_column(default=dt.datetime.utcnow)


class MeetingStatus(str, enum.Enum):
    SCHEDULED = "SCHEDULED"
    COMPLETED = "COMPLETED"
    CANCELED = "CANCELED"


class ClientMeeting(Base):
    __tablename__ = "client_meeting"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    admin_id: Mapped[int] = mapped_column(ForeignKey("admin.id", ondelete="CASCADE"), nullable=False)
    contact_id: Mapped[int] = mapped_column(ForeignKey("contact.id", ondelete="CASCADE"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    scheduled_at: Mapped[dt.datetime] = mapped_column(nullable=False)
    duration_minutes: Mapped[int | None] = mapped_column(Integer, default=30)
    meeting_link: Mapped[str | None] = mapped_column(String(512))
    status: Mapped[MeetingStatus] = mapped_column(default=MeetingStatus.SCHEDULED)
    created_at: Mapped[dt.datetime | None] = mapped_column(default=dt.datetime.utcnow)


class Article(Base):
    __tablename__ = "article"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    admin_id: Mapped[int | None] = mapped_column(ForeignKey("admin.id", ondelete="SET NULL"))
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    topic: Mapped[str] = mapped_column(String(255), nullable=False)
    detail: Mapped[str] = mapped_column(Text, nullable=False)
    read_minutes: Mapped[int | None] = mapped_column(Integer)
    published_date: Mapped[dt.date] = mapped_column(nullable=False)
    published_time: Mapped[dt.time] = mapped_column(nullable=False)
    created_at: Mapped[dt.datetime | None] = mapped_column(default=dt.datetime.utcnow)


class SubscriptionStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    UNSUBSCRIBED = "UNSUBSCRIBED"


class WebsiteSubscription(Base):
    __tablename__ = "website_subscription"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    subscribed_at: Mapped[dt.datetime | None] = mapped_column(default=dt.datetime.utcnow)
    status: Mapped[SubscriptionStatus] = mapped_column(default=SubscriptionStatus.ACTIVE)