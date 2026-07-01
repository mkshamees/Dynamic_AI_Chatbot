from sqlalchemy.orm import Session

from backend.app.auth.hashing import hash_password
from backend.app.models.user import User
from backend.app.schemas.user import UserCreate


def get_user_by_email(db: Session, email: str):
    """
    Return a user by email.
    """
    return db.query(User).filter(User.email == email).first()


def get_user_by_username(db: Session, username: str):
    """
    Return a user by username.
    """
    return db.query(User).filter(User.username == username).first()


def create_user(db: Session, user: UserCreate):
    """
    Create a new user.
    """

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