from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas
from utils.email_sender import send_email

router = APIRouter(
    prefix="/articles",
    tags=["Articles"]
)

def send_article_notification(db: Session, article: models.Article):
    # Fetch all active subscribers
    subscribers = db.query(models.WebsiteSubscription).filter(
        models.WebsiteSubscription.status == models.SubscriptionStatus.ACTIVE
    ).all()
    
    subject = f"New Article Published: {article.topic}"
    body = f"""
    <html>
    <body>
        <h2>We just published a new article!</h2>
        <p><strong>Topic:</strong> {article.topic}</p>
        <p><strong>Category:</strong> {article.category}</p>
        <p><strong>Read Time:</strong> {article.read_minutes} mins</p>
        <br>
        <p>Check it out on our <a href="https://krintix.com/insights/{article.id}">Insights</a> page!</p>
    </body>
    </html>
    """
    
    for sub in subscribers:
        try:
            send_email(sub.email, subject, body)
        except Exception as e:
            print(f"Failed to send to {sub.email}: {e}")

@router.post("/", response_model=schemas.ArticleResponse)
def create_article(
    article: schemas.ArticleCreate, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    new_article = models.Article(**article.model_dump())
    db.add(new_article)
    db.commit()
    db.refresh(new_article)
    
    # Trigger background email blast
    background_tasks.add_task(send_article_notification, db, new_article)
    
    return new_article

@router.get("/", response_model=list[schemas.ArticleResponse])
def get_articles(db: Session = Depends(get_db)):
    return db.query(models.Article).all()

@router.get("/{article_id}", response_model=schemas.ArticleResponse)
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article
