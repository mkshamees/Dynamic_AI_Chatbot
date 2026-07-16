import chromadb

from app.vector_store.embedding import embed

client = chromadb.PersistentClient(
    path="backend/chroma_db"
)

# =====================================================
# USER MEMORY COLLECTION
# =====================================================

memory_collection = client.get_or_create_collection(
    "user_memory"
)

# =====================================================
# DOCUMENT COLLECTION
# =====================================================

document_collection = client.get_or_create_collection(
    "documents"
)

# =====================================================
# USER MEMORY
# =====================================================

def save_memory(
    user_id,
    text,
    metadata=None,
):
    """
    Save memory into ChromaDB with metadata.
    """

    metadata = metadata or {}

    memory_collection.add(
        ids=[f"{user_id}_{hash(text)}"],
        documents=[text],
        embeddings=[embed(text)],
        metadatas=[
            {
                "user_id": user_id,
                **metadata,
            }
        ],
    )


def search_memory(
    user_id,
    query,
    n_results=5,
):
    """
    Semantic search over memories.
    """

    results = memory_collection.query(
        query_embeddings=[embed(query)],
        n_results=n_results,
        where={
            "user_id": user_id,
        },
        include=[
            "documents",
            "metadatas",
            "distances",
        ],
    )

    if not results["documents"]:
        return []

    output = []

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]

    for doc, meta, distance in zip(
        documents,
        metadatas,
        distances,
    ):

        output.append(
            {
                "text": doc,
                "metadata": meta,
                "score": round(1 - distance, 3),
            }
        )

    return output


# =====================================================
# DOCUMENTS
# =====================================================

def save_document_chunk(
    document_id,
    filename,
    chunk_number,
    chunk,
):

    document_collection.add(
        ids=[
            f"{document_id}_{chunk_number}"
        ],
        documents=[chunk],
        embeddings=[embed(chunk)],
        metadatas=[
            {
                "document_id": document_id,
                "filename": filename,
                "chunk": chunk_number,
            }
        ],
    )


def search_document(
    query,
    n_results=5,
):

    results = document_collection.query(
        query_embeddings=[embed(query)],
        n_results=n_results,
        include=[
            "documents",
            "metadatas",
        ],
    )

    if not results["documents"]:
        return []

    output = []

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]

    for doc, meta in zip(documents, metadatas):

        output.append(
            {
                "text": doc,
                "filename": meta.get(
                    "filename",
                    "Unknown Document",
                ),
                "chunk": meta.get(
                    "chunk",
                    0,
                ),
            }
        )

    return output