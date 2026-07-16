from backend.app.database.connection import SessionLocal
from backend.app.models.user import User

db = SessionLocal()

user = db.query(User).filter(
    User.email == "mukhtaryusuff@gmail.com"
).first()

if user:
    user.is_admin = True
    db.commit()
    print("User is now an administrator.")
else:
    print("User not found.")

db.close()