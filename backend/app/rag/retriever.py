from app.vector_store.chroma_store import search_document


def retrieve_document_context(
    question: str,
    n_results: int = 5,
) -> str:
    """
    Retrieve the most relevant document chunks from ChromaDB
    and prepare them as context for the AI.
    """

    results = search_document(
        query=question,
        n_results=n_results,
    )

    if not results:
        return ""

    context = []

    seen = set()

    for item in results:

        chunk_text = item["text"].strip()

        # Skip duplicate chunks
        if chunk_text in seen:
            continue

        seen.add(chunk_text)

        filename = item.get("filename", "Unknown Document")
        chunk = item.get("chunk", "?")

        context.append(
            f"""
Document: {filename}
Chunk: {chunk}

{chunk_text}
""".strip()
        )

    return "\n\n-----------------------------\n\n".join(context)