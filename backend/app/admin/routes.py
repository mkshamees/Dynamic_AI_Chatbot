from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.auth.dependencies import (
    admin_required,
)

from app.database.session import get_db

from app.models.user import User

from app.admin.schemas import (
    DashboardOverview,
    UserSummary,
    ConversationSummary,
    ConversationMessage,
    DocumentSummary,
    DocumentStatistics,
    MemorySummary,
    MemoryStatistics,
    AdminMessage,
)

from app.admin.service import (
    admin_service,
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


# =====================================================
# Dashboard
# =====================================================

@router.get(
    "/dashboard",
    response_model=DashboardOverview,
)
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    return admin_service.dashboard_overview(
        db
    )

# =====================================================
# GET ALL USERS
# =====================================================

@router.get(
    "/users",
    response_model=list[UserSummary],
)
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    return admin_service.get_all_users(db)


# =====================================================
# ACTIVATE USER
# =====================================================

@router.patch(
    "/users/{user_id}/activate",
    response_model=AdminMessage,
)
def activate_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    user = admin_service.activate_user(
        db,
        user_id,
    )

    if user is None:

        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return {
        "message": "User activated successfully."
    }


# =====================================================
# DEACTIVATE USER
# =====================================================

@router.patch(
    "/users/{user_id}/deactivate",
    response_model=AdminMessage,
)
def deactivate_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    user = admin_service.deactivate_user(
        db,
        user_id,
    )

    if user is None:

        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return {
        "message": "User deactivated successfully."
    }


# =====================================================
# PROMOTE ADMIN
# =====================================================

@router.patch(
    "/users/{user_id}/promote",
    response_model=AdminMessage,
)
def promote_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    user = admin_service.promote_admin(
        db,
        user_id,
    )

    if user is None:

        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return {
        "message": "User promoted successfully."
    }


# =====================================================
# REMOVE ADMIN
# =====================================================

@router.patch(
    "/users/{user_id}/demote",
    response_model=AdminMessage,
)
def demote_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    user = admin_service.remove_admin(
        db,
        user_id,
    )

    if user is None:

        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return {
        "message": "User demoted successfully."
    }


# =====================================================
# DELETE USER
# =====================================================

@router.delete(
    "/users/{user_id}",
    response_model=AdminMessage,
)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    success = admin_service.delete_user(
        db,
        user_id,
    )

    if not success:

        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return {
        "message": "User deleted successfully."
    }

# =====================================================
# ALL CONVERSATIONS
# =====================================================

@router.get(
    "/conversations",
    response_model=list[ConversationSummary],
)
def get_all_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    return admin_service.get_all_conversations(db)


# =====================================================
# LOAD CONVERSATION
# =====================================================

@router.get(
    "/conversations/{conversation_id}",
    response_model=list[ConversationMessage],
)
def load_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    messages = admin_service.load_conversation(
        db,
        conversation_id,
    )

    if not messages:

        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    return messages


# =====================================================
# DELETE CONVERSATION
# =====================================================

@router.delete(
    "/conversations/{conversation_id}",
    response_model=AdminMessage,
)
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    success = admin_service.delete_conversation(
        db,
        conversation_id,
    )

    if not success:

        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    return {
        "message": "Conversation deleted successfully."
    }

# =====================================================
# ALL DOCUMENTS
# =====================================================

@router.get(
    "/documents",
    response_model=list[DocumentSummary],
)
def get_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    return admin_service.get_all_documents(db)


# =====================================================
# DOCUMENT STATISTICS
# =====================================================

@router.get(
    "/documents/statistics",
    response_model=DocumentStatistics,
)
def document_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    return admin_service.document_statistics(db)


# =====================================================
# DELETE DOCUMENT
# =====================================================

@router.delete(
    "/documents/{document_id}",
    response_model=AdminMessage,
)
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    success = admin_service.delete_document(
        db,
        document_id,
    )

    if not success:

        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    return {

        "message": "Document deleted successfully."

    }

# =====================================================
# ALL MEMORIES
# =====================================================

@router.get(
    "/memories",
    response_model=list[MemorySummary],
)
def get_memories(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    return admin_service.get_all_memories(db)


# =====================================================
# MEMORY STATISTICS
# =====================================================

@router.get(
    "/memories/statistics",
    response_model=MemoryStatistics,
)
def memory_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    return admin_service.memory_statistics(db)


# =====================================================
# DELETE MEMORY
# =====================================================

@router.delete(
    "/memories/{memory_id}",
    response_model=AdminMessage,
)
def delete_memory(
    memory_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    success = admin_service.delete_memory(
        db,
        memory_id,
    )

    if not success:

        raise HTTPException(
            status_code=404,
            detail="Memory not found.",
        )

    return {
        "message": "Memory deleted successfully."
    }