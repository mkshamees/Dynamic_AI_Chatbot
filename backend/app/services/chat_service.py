from sqlalchemy.orm import Session

from backend.app.models.conversation import Conversation
from backend.app.models.message import Message

from backend.app.chatbot.ai_engine import ai_engine

from backend.app.services.memory_service import memory_service

from backend.app.rag.retriever import retrieve_document_context
from backend.app.services.title_service import title_service

from backend.app.agents.agent import agent

# Register all tools automatically
import backend.app.tools


class ChatService:
    """
    Handles AI conversations with:

    • Conversation history
    • Semantic memory
    • Document Retrieval (RAG)
    • Streaming responses
    """

    # ==========================================================
    # Conversation History
    # ==========================================================

    def get_conversation_history(
        self,
        db: Session,
        conversation_id: int,
        limit: int = 20,
    ):

        messages = (
            db.query(Message)
            .filter(
                Message.conversation_id == conversation_id
            )
            .order_by(Message.created_at.asc())
            .limit(limit)
            .all()
        )

        history = []

        for message in messages:

            history.append(
                {
                    "role": message.role,
                    "content": message.content,
                }
            )

        return history

    # ==========================================================
    # Generate Normal Reply
    # ==========================================================

    def generate_reply(
        self,
        db: Session,
        user_message: str,
        conversation_id: int,
    ):

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id == conversation_id
            )
            .first()
        )

        if conversation is None:
            raise ValueError("Conversation not found.")

        # ------------------------------------
        # Save User Message
        # ------------------------------------

        user_msg = Message(
            conversation_id=conversation_id,
            role="user",
            content=user_message,
        )

        db.add(user_msg)
        db.commit()

        # ------------------------------------
        # History
        # ------------------------------------

        history = self.get_conversation_history(
            db=db,
            conversation_id=conversation_id,
        )

        # ------------------------------------
        # Memory
        # ------------------------------------

        memory_prompt = memory_service.retrieve_memory(
            user_id=conversation.user_id,
            query=user_message,
        )

        # ------------------------------------
        # Documents
        # ------------------------------------

        document_prompt = retrieve_document_context(
            user_message
        )

        # ------------------------------------
        # AI Agent
        # ------------------------------------

        tool_result = agent.execute(user_message)

        if tool_result:

            ai_reply = tool_result

        else:

            ai_reply = ai_engine.generate_response(
                user_message=user_message,
                conversation_history=history,
                memory_prompt=memory_prompt,
                document_prompt=document_prompt,
            )

        # ------------------------------------
        # Save Assistant
        # ------------------------------------

        assistant = Message(
            conversation_id=conversation_id,
            role="assistant",
            content=ai_reply,
        )

        db.add(assistant)
        db.commit()


        

        # ------------------------------------
        # Save Memory
        # ------------------------------------

        memory_service.save_user_memory(
            db=db,
            user_id=conversation.user_id,
            text=user_message,
        )
        return ai_reply

    # ==========================================================
    # Stream Reply
    # ==========================================================

    def stream_reply(
        self,
        db: Session,
        user_message: str,
        conversation_id: int,
    ):

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id == conversation_id
            )
            .first()
        )

        if conversation is None:
            raise ValueError("Conversation not found.")

        # ------------------------------------
        # Save User Message
        # ------------------------------------

        user_msg = Message(
            conversation_id=conversation_id,
            role="user",
            content=user_message,
        )

        db.add(user_msg)
        db.commit()

        # ------------------------------------
        # History
        # ------------------------------------

        history = self.get_conversation_history(
            db=db,
            conversation_id=conversation_id,
        )

        # ------------------------------------
        # Memory
        # ------------------------------------

        memory_prompt = memory_service.retrieve_memory(
            user_id=conversation.user_id,
            query=user_message,
        )

        # ------------------------------------
        # Documents
        # ------------------------------------

        document_prompt = retrieve_document_context(
            user_message
        )

       # ------------------------------------
        # Agent
        # ------------------------------------

        tool_result = agent.execute(user_message)

        if tool_result:

            full_response = tool_result

            yield tool_result

        else:

            full_response = ""

            for token in ai_engine.stream_response(
                user_message=user_message,
                conversation_history=history,
                memory_prompt=memory_prompt,
                document_prompt=document_prompt,
            ):

                full_response += token

                yield token

        # ------------------------------------
        # Save Assistant
        # ------------------------------------

        assistant = Message(
            conversation_id=conversation_id,
            role="assistant",
            content=full_response,
        )

        db.add(assistant)
        db.commit()

        # ------------------------------------
        # Generate AI Conversation Title
        # ------------------------------------

        if (
            conversation.title is None
            or conversation.title == ""
            or conversation.title == "New Chat"
            or conversation.title == user_message[:40]
        ):

            conversation.title = title_service.generate_title(
                user_message
            )

            db.commit()

        # ------------------------------------
        # Save Memory
        # ------------------------------------

        memory_service.save_user_memory(
            db=db,
            user_id=conversation.user_id,
            text=user_message,
        )


# ==========================================================
# Global Instance
# ==========================================================

chat_service = ChatService()