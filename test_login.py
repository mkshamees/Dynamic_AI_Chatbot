from app.database.connection import SessionLocal
from app.services.user_service import authenticate_user

db = SessionLocal()

user = authenticate_user(
    db=db,
    email="myuser@example.com",
    password="MyPassword123"
)

if user:
    print("✅ Login Successful")
    print(user.email)
else:
    print("❌ Login Failed")

db.close()