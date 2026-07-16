from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.admin_dependencies import get_current_admin
from app.database.session import get_db
from app.models.user import User

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.get("/dashboard")
def admin_dashboard(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    """
    Test endpoint for administrator access.
    """

    return {
        "message": "Welcome Administrator",
        "admin": admin.username,
    }