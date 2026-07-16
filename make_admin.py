from app.database.connection import SessionLocal
from app.models.user import User

db = SessionLocal()

user = db.query(User).filter(
    User.email == "mukhtaryusuff@gmail.com"
).first()

if user:
    user.is_superuser = True
    user.role = "admin"
    db.commit()
    print("✅ User promoted to administrator.")
else:
    print("❌ User not found.")

db.close()