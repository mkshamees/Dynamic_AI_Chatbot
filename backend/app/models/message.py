from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from datetime import datetime

from app.database.base import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)

    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable=False)

    role = Column(String(20), nullable=False)  
    # "user" or "assistant"

    content = Column(Text, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)