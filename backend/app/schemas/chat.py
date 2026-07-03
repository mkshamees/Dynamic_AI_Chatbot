from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ChatRequest(BaseModel):
    """
    Incoming message from the authenticated user.
    """

    message: str
    conversation_id: Optional[int] = None


class ChatResponse(BaseModel):
    """
    AI response returned to the client.
    """

    conversation_id: int
    user_message: str
    ai_response: str
    created_at: datetime


class ConversationResponse(BaseModel):
    """
    Conversation metadata.
    """

    id: int
    title: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class MessageResponse(BaseModel):
    """
    Individual message in a conversation.
    """

    id: int
    sender: str
    content: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)