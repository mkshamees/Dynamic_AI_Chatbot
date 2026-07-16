from datetime import datetime

from pydantic import BaseModel, EmailStr


# =====================================================
# Dashboard
# =====================================================

class DashboardOverview(BaseModel):

    total_users: int

    active_users: int

    inactive_users: int

    admins: int

    today_registrations: int

    today_logins: int


# =====================================================
# User Summary
# =====================================================

class UserSummary(BaseModel):

    id: int

    username: str

    email: EmailStr

    role: str

    is_active: bool

    is_superuser: bool

    created_at: datetime

    last_login: datetime | None

    last_activity: datetime | None


# =====================================================
# User Details
# =====================================================

class UserDetails(UserSummary):

    total_conversations: int

    total_messages: int


# =====================================================
# Generic Response
# =====================================================

class AdminMessage(BaseModel):

    message: str

    # =====================================================
# Conversation Summary
# =====================================================

class ConversationSummary(BaseModel):

    id: int

    title: str | None

    username: str

    email: EmailStr

    created_at: datetime


# =====================================================
# Conversation Message
# =====================================================

class ConversationMessage(BaseModel):

    role: str

    content: str

    created_at: datetime

    # =====================================================
# Document Summary
# =====================================================

class DocumentSummary(BaseModel):

    id: int

    filename: str

    chunks: int

    created_at: datetime


# =====================================================
# Document Statistics
# =====================================================

class DocumentStatistics(BaseModel):

    total_documents: int

    total_chunks: int

    pdf_files: int

    docx_files: int

    txt_files: int

    csv_files: int

    xlsx_files: int

    # =====================================================
# Memory Summary
# =====================================================

class MemorySummary(BaseModel):

    id: int

    user_id: int

    content: str

    created_at: datetime


# =====================================================
# Memory Statistics
# =====================================================

class MemoryStatistics(BaseModel):

    total_memories: int

    total_users_with_memories: int