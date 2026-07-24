from passlib.context import CryptContext
from database import SessionLocal
import models

# Setup password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_super_admin():
    db = SessionLocal()
    
    # 1. Define your admin credentials here
    admin_name = "Abhay Singh Sengar"
    admin_email = "info@krintix.com"
    plain_password = "Krintix@new" 
    
    # 2. Hash the password
    hashed_password = pwd_context.hash(plain_password)
    
    # 3. Check if this admin already exists
    admin = db.query(models.Admin).filter(models.Admin.email == admin_email).first()
    
    if admin:
        print(f"Admin {admin_email} already exists. Updating password...")
        admin.password = hashed_password
    else:
        print(f"Creating new admin: {admin_email}...")
        admin = models.Admin(
            name=admin_name, 
            email=admin_email, 
            password=hashed_password
        )
        db.add(admin)
        
    db.commit()
    db.close()
    print("Admin database updated successfully!")

if __name__ == "__main__":
    create_super_admin()