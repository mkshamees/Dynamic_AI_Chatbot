import os
from datetime import datetime, timedelta

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.config.settings import settings

from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message
from app.models.document import Document
from app.models.memory import Memory


class AnalyticsService:

    # ==========================================================
    # OVERVIEW
    # ==========================================================

    def get_overview(self, db: Session):

        today = datetime.utcnow().date()

        return {
            "total_users": db.query(User).count(),
            "total_conversations": db.query(Conversation).count(),
            "total_messages": db.query(Message).count(),
            "total_documents": db.query(Document).count(),
            "total_memories": db.query(Memory).count(),

            "today_users": db.query(User).filter(
                func.date(User.created_at) == today
            ).count(),

            "today_conversations": db.query(Conversation).filter(
                func.date(Conversation.created_at) == today
            ).count(),

            "today_messages": db.query(Message).filter(
                func.date(Message.created_at) == today
            ).count(),
        }

    # ==========================================================
    # CONVERSATION TREND
    # ==========================================================

    def conversation_trend(
        self,
        db: Session,
        days: int = 7,
    ):

        start_date = datetime.utcnow().date() - timedelta(days=days - 1)

        rows = (
            db.query(
                func.date(Conversation.created_at).label("day"),
                func.count(Conversation.id).label("total"),
            )
            .filter(Conversation.created_at >= start_date)
            .group_by(func.date(Conversation.created_at))
            .order_by(func.date(Conversation.created_at))
            .all()
        )

        return [
            {
                "date": str(day),
                "conversations": total,
            }
            for day, total in rows
        ]

    # ==========================================================
    # MESSAGE TREND
    # ==========================================================

    def message_trend(
        self,
        db: Session,
        days: int = 7,
    ):

        start_date = datetime.utcnow().date() - timedelta(days=days - 1)

        rows = (
            db.query(
                func.date(Message.created_at).label("day"),
                func.count(Message.id).label("total"),
            )
            .filter(Message.created_at >= start_date)
            .group_by(func.date(Message.created_at))
            .order_by(func.date(Message.created_at))
            .all()
        )

        return [
            {
                "date": str(day),
                "messages": total,
            }
            for day, total in rows
        ]

    # ==========================================================
    # DOCUMENT ANALYTICS
    # ==========================================================

    def document_stats(self, db: Session):

        documents = db.query(Document).all()

        pdf = docx = txt = csv = xlsx = 0

        total_size = 0
        total_chunks = 0

        recent_uploads = []

        for doc in documents:

            filename = doc.filename.lower()

            if filename.endswith(".pdf"):
                pdf += 1

            elif filename.endswith(".docx"):
                docx += 1

            elif filename.endswith(".txt"):
                txt += 1

            elif filename.endswith(".csv"):
                csv += 1

            elif filename.endswith(".xlsx"):
                xlsx += 1

            total_chunks += doc.chunks or 0

            if os.path.exists(doc.file_path):
                total_size += os.path.getsize(doc.file_path)

            recent_uploads.append(doc.filename)

        average_chunks = (
            round(total_chunks / len(documents), 2)
            if documents
            else 0
        )

        return {
            "total_documents": len(documents),

            "pdf_files": pdf,
            "docx_files": docx,
            "txt_files": txt,
            "csv_files": csv,
            "xlsx_files": xlsx,

            "total_storage_mb": round(
                total_size / (1024 * 1024),
                2,
            ),

            "total_chunks": total_chunks,
            "average_chunks": average_chunks,

            "recent_uploads": recent_uploads[-5:],
        }

    # ==========================================================
    # MEMORY ANALYTICS
    # ==========================================================

    def memory_stats(self, db: Session):

        today = datetime.utcnow().date()

        memories = db.query(Memory).all()

        total_memories = len(memories)

        created_today = (
            db.query(Memory)
            .filter(func.date(Memory.created_at) == today)
            .count()
        )

        retrieved_today = sum(
            memory.retrieval_count or 0
            for memory in memories
        )

        average_importance = (
            round(
                sum(
                    memory.importance_score or 0
                    for memory in memories
                ) / total_memories,
                2,
            )
            if total_memories
            else 0
        )

        category_rows = (
            db.query(
                Memory.category,
                func.count(Memory.id),
            )
            .group_by(Memory.category)
            .all()
        )

        categories = [
            {
                "category": category,
                "count": count,
            }
            for category, count in category_rows
        ]

        key_rows = (
            db.query(
                Memory.key,
                func.count(Memory.id),
            )
            .group_by(Memory.key)
            .order_by(func.count(Memory.id).desc())
            .limit(10)
            .all()
        )

        top_keys = [
            {
                "key": key,
                "count": count,
            }
            for key, count in key_rows
        ]

        recent = (
            db.query(Memory)
            .order_by(Memory.created_at.desc())
            .limit(10)
            .all()
        )

        recent_memories = [
            {
                "key": memory.key,
                "value": memory.value,
                "category": memory.category,
                "importance": memory.importance_score,
                "retrieval_count": memory.retrieval_count,
                "created_at": memory.created_at,
            }
            for memory in recent
        ]

        return {
            "total_memories": total_memories,
            "created_today": created_today,
            "retrieved_today": retrieved_today,
            "average_importance": average_importance,
            "categories": categories,
            "top_keys": top_keys,
            "recent_memories": recent_memories,
        }

    # ==========================================================
    # AI USAGE
    # ==========================================================

    def ai_usage(self, db: Session):

        total_requests = (
            db.query(Message)
            .filter(Message.role == "assistant")
            .count()
        )

        return {
            "provider": settings.AI_PROVIDER,
            "requests": total_requests,
            "estimated_tokens": total_requests * 450,
            "average_response_time": 0.8,
        }

    # ==========================================================
    # SYSTEM INFO
    # ==========================================================

    def system_info(self):

        if settings.AI_PROVIDER.lower() == "groq":
            model = settings.GROQ_MODEL

        elif settings.AI_PROVIDER.lower() == "openai":
            model = settings.OPENAI_MODEL

        else:
            model = settings.OLLAMA_MODEL

        return {
            "ai_provider": settings.AI_PROVIDER,
            "ai_model": model,
            "database": "PostgreSQL",
            "status": "Healthy",
        }


analytics_service = AnalyticsService()