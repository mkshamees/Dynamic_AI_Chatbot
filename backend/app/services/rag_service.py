from backend.app.vector_store.chroma_store import search_document


class RAGService:

    def retrieve_context(
        self,
        query: str,
    ) -> str:

        chunks = search_document(query)

        if not chunks:
            return ""

        return "\n\n".join(chunks)


rag_service = RAGService()