from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
)


# ==========================================================
# BASE
# ==========================================================

class UserBase(BaseModel):

    username: str

    email: EmailStr


# ==========================================================
# CREATE USER
# ==========================================================

class UserCreate(UserBase):

    password: str


# ==========================================================
# UPDATE USER
# ==========================================================

class UserUpdate(BaseModel):

    username: str | None = None

    email: EmailStr | None = None

    is_active: bool | None = None

    role: str | None = None


# ==========================================================
# USER RESPONSE
# ==========================================================

class UserResponse(UserBase):

    id: int

    is_active: bool

    role: str

    is_superuser: bool

    created_at: datetime

    last_login: datetime | None = None

    last_activity: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )


# ==========================================================
# LOGIN
# ==========================================================

class UserLogin(BaseModel):

    email: EmailStr

    password: str


# ==========================================================
# TOKEN
# ==========================================================

class Token(BaseModel):

    access_token: str

    token_type: str


# ==========================================================
# TOKEN DATA
# ==========================================================

class TokenData(BaseModel):

    email: str | None = None