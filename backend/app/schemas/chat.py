from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None


class ChatResponse(BaseModel):
    conversation_id: int
    user_message: str
    ai_response: str
    created_at: datetime


class ConversationResponse(BaseModel):
    id: int
    title: str
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


class MessageResponse(BaseModel):
    id: int
    sender: str
    content: str
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )