from datetime import datetime

from backend.app.chatbot.ai_engine import ai_engine


class ChatService:
    """
    Handles chatbot conversations.
    """

    def generate_reply(
        self,
        message: str,
        conversation_history: list | None = None,
    ):
        """
        Generate an AI reply.
        """

        ai_reply = ai_engine.generate_response(
            user_message=message,
            conversation_history=conversation_history,
        )

        return {
            "conversation_id": 1,
            "user_message": message,
            "ai_response": ai_reply,
            "created_at": datetime.utcnow(),
        }


chat_service = ChatService()