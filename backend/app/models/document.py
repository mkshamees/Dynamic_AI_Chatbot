from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from backend.app.database.base import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    document_id = Column(
        String,
        unique=True,
        nullable=False,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    filename = Column(
        String,
        nullable=False,
    )

    file_path = Column(
        String,
        nullable=False,
    )

    file_type = Column(
        String,
        default="unknown",
    )

    file_size = Column(
        Integer,
        default=0,
    )

    chunks = Column(
        Integer,
        default=0,
    )

    total_characters = Column(
        Integer,
        default=0,
    )

    total_words = Column(
        Integer,
        default=0,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )