from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from sqlalchemy.exc import IntegrityError

router = APIRouter(
    prefix="/subscriptions",
    tags=["Subscriptions"]
)

@router.post("/", response_model=schemas.WebsiteSubscriptionResponse)
def subscribe(sub: schemas.WebsiteSubscriptionCreate, db: Session = Depends(get_db)):
    db_sub = db.query(models.WebsiteSubscription).filter(models.WebsiteSubscription.email == sub.email).first()
    if db_sub:
        if db_sub.status == models.SubscriptionStatus.UNSUBSCRIBED:
            db_sub.status = models.SubscriptionStatus.ACTIVE
            db.commit()
            db.refresh(db_sub)
            return db_sub
        else:
            raise HTTPException(status_code=400, detail="Email is already subscribed")
            
    new_sub = models.WebsiteSubscription(email=sub.email)
    db.add(new_sub)
    try:
        db.commit()
        db.refresh(new_sub)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email could not be subscribed")
        
    return new_sub

@router.get("/", response_model=list[schemas.WebsiteSubscriptionResponse])
def get_subscriptions(db: Session = Depends(get_db)):
    return db.query(models.WebsiteSubscription).all()
