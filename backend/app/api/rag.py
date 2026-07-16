from fastapi import APIRouter
from pydantic import BaseModel

from app.vector_store.chroma_store import search_document

router = APIRouter(
    prefix="/rag",
    tags=["RAG"],
)


class Question(BaseModel):
    question: str


@router.post("/search")
def search(body: Question):

    chunks = search_document(
        body.question
    )

    return {
        "chunks": chunks
    }