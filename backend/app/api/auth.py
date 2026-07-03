from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from backend.app.auth.dependencies import get_current_user
from backend.app.auth.jwt_handler import create_access_token
from backend.app.database.session import get_db
from backend.app.models.user import User
from backend.app.schemas.user import (
    Token,
    UserCreate,
    UserResponse,
)
from backend.app.services.user_service import (
    authenticate_user,
    create_user,
    get_user_by_email,
    get_user_by_username,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    """
    Register a new user.
    """

    if get_user_by_email(db, user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    if get_user_by_username(db, user.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists.",
        )

    return create_user(db, user)


@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Authenticate a user and return a JWT access token.
    """

    print("\n========== LOGIN DEBUG ==========")
    print("Username received :", repr(form_data.username))
    print("Password received :", repr(form_data.password))
    print("================================")

    user = authenticate_user(
        db=db,
        email=form_data.username,
        password=form_data.password,
    )

    print("Authentication Result:", user)

    if not user:
        print("❌ LOGIN FAILED")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    print("✅ LOGIN SUCCESSFUL")

    access_token = create_access_token(
        data={
            "sub": user.email,
        }
    )

    print("Generated Token:", access_token)
    print("================================\n")

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get(
    "/me",
    response_model=UserResponse,
)
def read_current_user(
    current_user: User = Depends(get_current_user),
):
    """
    Return the currently authenticated user.
    """
    return current_user