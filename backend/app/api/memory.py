from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.auth.dependencies import get_current_user
from backend.app.database.session import get_db
from backend.app.models.user import User

from backend.app.services.memory_service import memory_service

router = APIRouter(
    prefix="/memory",
    tags=["Memory"],
)


@router.post("/save")
def save_user_memory(
    text: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    memory_service.save_user_memory(
        user_id=current_user.id,
        text=text,
    )

    return {
        "message": "Memory saved successfully."
    }


@router.post("/search")
def search_user_memory(
    query: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    memories = memory_service.retrieve_memory(
        user_id=current_user.id,
        query=query,
    )

    return {
        "memories": memories
    }