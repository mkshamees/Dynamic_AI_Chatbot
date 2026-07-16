from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from backend.app.database.base import Base


class AIUsage(Base):
    __tablename__ = "ai_usage"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    provider = Column(
        String,
        nullable=False,
    )

    model = Column(
        String,
        nullable=False,
    )

    tokens = Column(
        Integer,
        default=0,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )