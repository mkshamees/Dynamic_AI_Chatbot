from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from datetime import datetime

from backend.app.database.base import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)

    conversation_id = Column(Integer, ForeignKey("conversations.id"))

    sender = Column(String(20))

    message = Column(Text)

    sentiment = Column(String(20))

    intent = Column(String(50))

    created_at = Column(DateTime, default=datetime.utcnow)