from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
)

from sqlalchemy.orm import relationship

from backend.app.database.base import Base


class User(Base):
    __tablename__ = "users"

    # ==========================================================
    # PRIMARY KEY
    # ==========================================================

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # ==========================================================
    # ACCOUNT INFORMATION
    # ==========================================================

    username = Column(
        String(50),
        unique=True,
        nullable=False,
    )

    email = Column(
        String(100),
        unique=True,
        nullable=False,
    )

    hashed_password = Column(
        String(255),
        nullable=False,
    )

    # ==========================================================
    # ACCOUNT STATUS
    # ==========================================================

    is_active = Column(
        Boolean,
        default=True,
    )

    role = Column(
        String(20),
        default="user",
        nullable=False,
    )

    is_superuser = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    # ==========================================================
    # AUDIT INFORMATION
    # ==========================================================

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    last_login = Column(
        DateTime,
        nullable=True,
    )

    last_activity = Column(
        DateTime,
        nullable=True,
    )

    # ==========================================================
    # RELATIONSHIPS
    # ==========================================================

    conversations = relationship(
        "Conversation",
        backref="user",
        cascade="all, delete-orphan",
    )

    # ==========================================================
    # STRING REPRESENTATION
    # ==========================================================

    def __repr__(self):

        return (
            f"<User("
            f"id={self.id}, "
            f"username='{self.username}', "
            f"role='{self.role}'"
            f")>"
        )