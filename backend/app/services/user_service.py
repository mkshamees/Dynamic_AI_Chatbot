from sqlalchemy.orm import Session

from backend.app.auth.hashing import hash_password, verify_password
from backend.app.models.user import User
from backend.app.schemas.user import UserCreate


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def create_user(db: Session, user: UserCreate):
    hashed_password = hash_password(user.password)

    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def authenticate_user(db: Session, email: str, password: str):
    print("\n========== AUTH DEBUG ==========")
    print("Email:", email)

    user = get_user_by_email(db, email)

    if user is None:
        print("❌ User NOT found in database.")
        return None

    print("✅ User found")
    print("Database email:", user.email)
    print("Database username:", user.username)
    print("Stored hash:", user.hashed_password)

    password_ok = verify_password(password, user.hashed_password)

    print("Password correct?", password_ok)

    if not password_ok:
        print("❌ Password verification failed.")
        return None

    print("✅ Authentication successful.")
    return user