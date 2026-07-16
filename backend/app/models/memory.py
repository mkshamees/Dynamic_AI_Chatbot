from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    DateTime,
)

from datetime import datetime

from app.database.base import Base


class Memory(Base):
    __tablename__ = "memories"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    # ---------------------------------------
    # Memory
    # ---------------------------------------

    key = Column(
        String(100),
        nullable=False,
        index=True,
    )

    value = Column(
        String(1000),
        nullable=False,
    )

    # ---------------------------------------
    # Memory Type
    # ---------------------------------------

    memory_type = Column(
        String(50),
        default="conversation",
    )

    category = Column(
        String(100),
        default="General",
    )

    # ---------------------------------------
    # Analytics
    # ---------------------------------------

    retrieval_count = Column(
        Integer,
        default=0,
    )

    importance_score = Column(
        Float,
        default=1.0,
    )

    # ---------------------------------------
    # Dates
    # ---------------------------------------

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    last_accessed = Column(
        DateTime,
        nullable=True,
    )