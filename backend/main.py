from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Adjust these imports based on your project structure
import models
from database import engine

# Import all your routers
from routers import auth, contact, employee, admin, email, meeting, article, subscription

# Import the background scheduler
from routers.tasks import start_scheduler

# ---------------------------------------------------------
# LIFESPAN (Startup and Shutdown events)
# ---------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- Code here runs BEFORE the server starts taking requests ---
    print("Starting up the Krintix API...")
    
    # Start the background task scheduler (for marking absent employees)
    print("Starting background scheduler...")
    start_scheduler()
    
    yield # This yields control back to FastAPI while the app is running
    
    # --- Code here runs AFTER the server is shutting down ---
    print("Shutting down the Krintix API...")

# ---------------------------------------------------------
# APP INITIALIZATION
# ---------------------------------------------------------
app = FastAPI(
    title="Krintix Backend API",
    description="API for managing contacts, employees, and administration.",
    version="1.0.0",
    lifespan=lifespan
)

# Create database tables if they don't exist yet
# (Though you already created them manually, this is a good safety net)
models.Base.metadata.create_all(bind=engine)

# ---------------------------------------------------------
# CORS MIDDLEWARE
# ---------------------------------------------------------
# This allows your frontend (e.g., React, Vue, HTML/JS) to make requests 
# to this backend without getting blocked by the browser.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace "*" with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# ROUTER INCLUSION
# ---------------------------------------------------------
app.include_router(auth.router)
app.include_router(contact.router)
app.include_router(employee.router)
app.include_router(admin.router)
app.include_router(email.router)
app.include_router(meeting.router)
app.include_router(article.router)
app.include_router(subscription.router)

# ---------------------------------------------------------
# ROOT ENDPOINT
# ---------------------------------------------------------
@app.get("/", tags=["Health Check"])
def root():
    """
    A simple health check endpoint to confirm the API is running.
    """
    return {
        "message": "Welcome to the Krintix API!",
        "status": "Online"
    }