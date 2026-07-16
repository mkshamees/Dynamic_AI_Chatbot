from datetime import datetime
from io import StringIO
import json

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from fastapi.responses import (
    Response,
    StreamingResponse,
)
from sqlalchemy.orm import Session

from backend.app.auth.dependencies import get_current_user
from backend.app.database.session import get_db

from backend.app.models.conversation import Conversation
from backend.app.models.message import Message
from backend.app.models.user import User

from backend.app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ConversationResponse,
    MessageResponse,
)

from backend.app.services.chat_service import chat_service
from backend.app.services.memory_ai import extract_memory

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

# ======================================================
# SEND MESSAGE
# ======================================================

@router.post(
    "/",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if request.conversation_id is None:

        conversation = Conversation(
            user_id=current_user.id,
            title="New Chat",
        )

        db.add(conversation)
        db.commit()
        db.refresh(conversation)

        conversation_id = conversation.id

    else:

        conversation_id = request.conversation_id

    # Save useful memory

    extract_memory(
        db=db,
        user_id=current_user.id,
        user_message=request.message,
    )

    ai_reply = chat_service.generate_reply(
        db=db,
        user_message=request.message,
        conversation_id=conversation_id,
    )

    return ChatResponse(
        conversation_id=conversation_id,
        user_message=request.message,
        ai_response=ai_reply,
        created_at=datetime.utcnow(),
    )


# ======================================================
# STREAM CHAT
# ======================================================

@router.post("/stream")
def stream_chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if request.conversation_id is None:

        conversation = Conversation(
            user_id=current_user.id,
            title="New Chat",
        )

        db.add(conversation)
        db.commit()
        db.refresh(conversation)

        conversation_id = conversation.id

    else:

        conversation_id = request.conversation_id

    extract_memory(
        db=db,
        user_id=current_user.id,
        user_message=request.message,
    )

    def event_stream():

        yield (
            f"data: "
            f"{json.dumps({'conversation_id': conversation_id})}\n\n"
        )

        for token in chat_service.stream_reply(
            db=db,
            user_message=request.message,
            conversation_id=conversation_id,
        ):

            yield (
                f"data: "
                f"{json.dumps({'token': token})}\n\n"
            )

        yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
    )


# ======================================================
# GET ALL CONVERSATIONS
# ======================================================

@router.get(
    "/conversations",
    response_model=list[ConversationResponse],
)
def get_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    conversations = (
        db.query(Conversation)
        .filter(
            Conversation.user_id == current_user.id
        )
        .order_by(
            Conversation.created_at.desc()
        )
        .all()
    )

    return conversations


# ======================================================
# SEARCH CONVERSATIONS
# ======================================================

@router.get("/search")
def search_conversations(
    q: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    messages = (

        db.query(Message)

        .join(
            Conversation,
            Conversation.id == Message.conversation_id,
        )

        .filter(

            Conversation.user_id == current_user.id,

            Message.content.ilike(f"%{q}%")

        )

        .all()

    )

    results = {}

    for message in messages:

        cid = message.conversation_id

        if cid not in results:

            conversation = (

                db.query(Conversation)

                .filter(
                    Conversation.id == cid
                )

                .first()

            )

            results[cid] = {

                "conversation_id": cid,

                "title": conversation.title,

                "snippet": message.content[:120],

                "created_at": conversation.created_at,

            }

    return list(results.values())


# ======================================================
# LOAD ONE CONVERSATION
# ======================================================

@router.get(
    "/conversations/{conversation_id}",
    response_model=list[MessageResponse],
)
def load_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == current_user.id,
        )
        .first()
    )

    if not conversation:

        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    messages = (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation_id
        )
        .order_by(
            Message.created_at.asc()
        )
        .all()
    )

    return [

        MessageResponse(
            id=m.id,
            sender=m.role,
            content=m.content,
            created_at=m.created_at,
        )

        for m in messages

    ]

# ======================================================
# DELETE CONVERSATION
# ======================================================

@router.delete(
    "/conversations/{conversation_id}",
)
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == current_user.id,
        )
        .first()
    )

    if not conversation:

        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation_id
        )
        .delete()
    )

    db.delete(conversation)

    db.commit()

    return {
        "message": "Conversation deleted successfully."
    }


# ======================================================
# EXPORT CONVERSATION (MARKDOWN)
# ======================================================

@router.get("/export/{conversation_id}")
def export_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == current_user.id,
        )
        .first()
    )

    if conversation is None:

        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    messages = (
        db.query(Message)
        .filter(
            Message.conversation_id == conversation_id
        )
        .order_by(
            Message.created_at.asc()
        )
        .all()
    )

    markdown = StringIO()

    markdown.write(
        f"# {conversation.title}\n\n"
    )

    markdown.write(
        f"Created: {conversation.created_at}\n\n"
    )

    markdown.write("---\n\n")

    for message in messages:

        role = (
            "👤 User"
            if message.role == "user"
            else "🤖 Assistant"
        )

        markdown.write(
            f"## {role}\n\n"
        )

        markdown.write(
            f"{message.content}\n\n"
        )

    filename = (
        (conversation.title or f"Conversation_{conversation.id}")
        .replace(" ", "_")
        .replace("/", "_")
        + ".md"
    )

    return Response(
        content=markdown.getvalue(),
        media_type="text/markdown",
        headers={
            "Content-Disposition":
            f'attachment; filename="{filename}"'
        },
    )