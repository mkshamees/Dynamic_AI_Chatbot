from datetime import datetime

from fastapi import (
    Depends,
    HTTPException,
    status,
)

from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from app.auth.jwt_handler import verify_access_token
from app.database.session import get_db
from app.models.user import User
from app.services.user_service import get_user_by_email


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


# ==========================================================
# CURRENT USER
# ==========================================================

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    """
    Get the currently authenticated user.
    """

    print("\n========== AUTH DEBUG ==========")
    print("Received Token:", repr(token))

    payload = verify_access_token(token)

    print("Decoded Payload:", payload)

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials.",
        headers={
            "WWW-Authenticate": "Bearer",
        },
    )

    if payload is None:

        print("❌ Token could not be decoded.")

        raise credentials_exception

    email = payload.get("sub")

    print("Email from token:", email)

    if email is None:

        print("❌ No email found inside token.")

        raise credentials_exception

    user = get_user_by_email(
        db,
        email,
    )

    print("Database user:", user)

    if user is None:

        print("❌ User not found.")

        raise credentials_exception

    # ==========================================
    # Update Last Activity
    # ==========================================

    user.last_activity = datetime.utcnow()

    db.commit()

    print("✅ Authentication successful.")
    print("================================\n")

    return user


# ==========================================================
# ADMIN REQUIRED
# ==========================================================

def admin_required(
    current_user: User = Depends(get_current_user),
):

    if not current_user.is_active:

        raise HTTPException(
            status_code=403,
            detail="Inactive account.",
        )

    if current_user.role.lower() != "admin":

        raise HTTPException(
            status_code=403,
            detail="Administrator access required.",
        )

    return current_user


# ==========================================================
# SUPERUSER REQUIRED
# ==========================================================

def superuser_required(
    current_user: User = Depends(get_current_user),
):

    if not current_user.is_superuser:

        raise HTTPException(
            status_code=403,
            detail="Superuser access required.",
        )

    return current_user