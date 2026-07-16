from datetime import date, datetime
from pydantic import BaseModel


# ==========================================================
# Overview
# ==========================================================

class AnalyticsOverview(BaseModel):
    total_users: int
    total_conversations: int
    total_messages: int
    total_documents: int
    total_memories: int

    today_users: int
    today_conversations: int
    today_messages: int


# ==========================================================
# Conversation Trend
# ==========================================================

class ConversationTrend(BaseModel):
    date: date
    conversations: int


# ==========================================================
# Message Trend
# ==========================================================

class MessageTrend(BaseModel):
    date: date
    messages: int


# ==========================================================
# User Growth
# ==========================================================

class UserGrowth(BaseModel):
    date: date
    users: int


# ==========================================================
# Provider Usage
# ==========================================================

class ProviderUsage(BaseModel):
    provider: str
    count: int


# ==========================================================
# Document Analytics
# ==========================================================

class DocumentAnalytics(BaseModel):
    total_documents: int

    pdf_files: int
    docx_files: int
    txt_files: int
    csv_files: int
    xlsx_files: int

    total_storage_mb: float

    total_chunks: int

    recent_uploads: list[str]


# ==========================================================
# Memory Analytics Components
# ==========================================================

class MemoryCategory(BaseModel):
    category: str
    count: int


class MemoryKey(BaseModel):
    key: str
    count: int


class RecentMemory(BaseModel):
    key: str
    value: str
    category: str
    importance: int
    retrieval_count: int
    created_at: datetime


# ==========================================================
# Memory Analytics
# ==========================================================

class MemoryAnalytics(BaseModel):
    total_memories: int

    created_today: int

    retrieved_today: int

    average_importance: float

    categories: list[MemoryCategory]

    top_keys: list[MemoryKey]

    recent_memories: list[RecentMemory]


# ==========================================================
# System Analytics
# ==========================================================

class SystemAnalytics(BaseModel):
    ai_provider: str
    ai_model: str
    database: str
    status: str


# ==========================================================
# AI Usage
# ==========================================================

class AIUsage(BaseModel):
    provider: str
    requests: int
    estimated_tokens: int
    average_response_time: float