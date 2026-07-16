from sqlalchemy.orm import Session

from backend.app.models.memory import Memory

from backend.app.vector_store.chroma_store import (
    save_memory,
    search_memory,
)


class MemoryService:
    """
    Semantic Memory Service.
    Stores memories in both:

    • ChromaDB (semantic search)
    • SQL Database (analytics)
    """

    def save_user_memory(
        self,
        db: Session,
        user_id: int,
        text: str,
        category: str = "general",
        importance: int = 5,
    ):
        """
        Save memory into both ChromaDB and SQL.
        """

        # -----------------------------
        # Save into ChromaDB
        # -----------------------------

        save_memory(
            user_id=user_id,
            text=text,
            metadata={
                "category": category,
                "importance": importance,
            },
        )

        # -----------------------------
        # Save into SQL
        # -----------------------------

        memory = Memory(
            user_id=user_id,
            key=category,
            value=text,
            category=category,
            memory_type="conversation",
            importance_score=float(importance),
        )

        db.add(memory)
        db.commit()

    def retrieve_memory(
        self,
        user_id: int,
        query: str,
    ) -> str:
        """
        Retrieve relevant memories.
        """

        memories = search_memory(
            user_id=user_id,
            query=query,
        )

        if not memories:
            return ""

        return "\n".join(
            memory["text"]
            for memory in memories
        )


memory_service = MemoryService()