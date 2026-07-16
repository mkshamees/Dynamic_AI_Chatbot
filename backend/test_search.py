from backend.app.vector_store.chroma_store import search_document

results = search_document(
    "What is the annual profit in 2016?"
)

print(results)