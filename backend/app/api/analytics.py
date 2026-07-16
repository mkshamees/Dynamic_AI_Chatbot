from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db

from app.models.user import User

from app.schemas.analytics import (
    AnalyticsOverview,
    ConversationTrend,
    MessageTrend,
    DocumentAnalytics,
    MemoryAnalytics,
    SystemAnalytics,
    AIUsage,
)

print("AIUsage =", AIUsage)

from app.services.analytics_service import analytics_service

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


# ==========================================================
# Dashboard Overview
# ==========================================================

@router.get(
    "/overview",
    response_model=AnalyticsOverview,
)
def overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return analytics_service.get_overview(db)


# ==========================================================
# Conversation Trend
# ==========================================================

@router.get(
    "/conversations",
    response_model=list[ConversationTrend],
)
def conversation_trend(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return analytics_service.conversation_trend(db)


# ==========================================================
# Message Trend
# ==========================================================

@router.get(
    "/messages",
    response_model=list[MessageTrend],
)
def message_trend(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return analytics_service.message_trend(db)


# ==========================================================
# Document Analytics
# ==========================================================

@router.get(
    "/documents",
    response_model=DocumentAnalytics,
)
def document_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return analytics_service.document_stats(db)


# ==========================================================
# Memory Analytics
# ==========================================================

@router.get(
    "/memory",
    response_model=MemoryAnalytics,
)
def memory_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return analytics_service.memory_stats(db)

# ==========================================================
# AI Usage
# ==========================================================

@router.get(
    "/ai-usage",
    response_model=AIUsage,
)
def ai_usage(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return analytics_service.ai_usage(db)

# ==========================================================
# System Information
# ==========================================================

@router.get(
    "/system",
    response_model=SystemAnalytics,
)
def system_info(
    current_user: User = Depends(get_current_user),
):
    return analytics_service.system_info()