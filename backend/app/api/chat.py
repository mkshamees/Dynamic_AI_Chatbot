from fastapi import APIRouter, Depends

from backend.app.auth.dependencies import get_current_user
from backend.app.models.user import User
from backend.app.schemas.chat import ChatRequest, ChatResponse
from backend.app.services.chat_service import chat_service

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "/",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
):
    """
    Send a message to the AI chatbot.
    """

    response = chat_service.generate_reply(
        message=request.message,
        conversation_history=None,
    )

    return response