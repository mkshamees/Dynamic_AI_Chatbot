import os
import uuid

from sqlalchemy.orm import Session

from app.models.document import Document

from app.rag.loader import load_document
from app.rag.splitter import split_text

from app.vector_store.chroma_store import (
    save_document_chunk,
)


def index_document(
    db: Session,
    user_id: int,
    filename: str,
    file_path: str,
):
    """
    Index document into ChromaDB
    and save metadata into PostgreSQL.
    """

    # ---------------------------------------
    # Load document
    # ---------------------------------------

    text = load_document(file_path)

    # ---------------------------------------
    # Split text
    # ---------------------------------------

    chunks = split_text(text)

    # ---------------------------------------
    # Document statistics
    # ---------------------------------------

    file_size = os.path.getsize(file_path)

    file_type = os.path.splitext(filename)[1].replace(".", "").lower()

    total_characters = len(text)

    total_words = len(text.split())

    # ---------------------------------------
    # Generate UUID
    # ---------------------------------------

    document_id = str(uuid.uuid4())

    # ---------------------------------------
    # Save into ChromaDB
    # ---------------------------------------

    for i, chunk in enumerate(chunks):

        save_document_chunk(
            document_id=document_id,
            filename=filename,
            chunk_number=i,
            chunk=chunk,
        )

    # ---------------------------------------
    # Save metadata
    # ---------------------------------------

    document = Document(
        document_id=document_id,
        user_id=user_id,
        filename=filename,
        file_path=file_path,
        file_type=file_type,
        file_size=file_size,
        chunks=len(chunks),
        total_characters=total_characters,
        total_words=total_words,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    # ---------------------------------------
    # Return
    # ---------------------------------------

    return {
        "document_id": document.document_id,
        "filename": document.filename,
        "file_type": document.file_type,
        "file_size": document.file_size,
        "chunks": document.chunks,
        "total_characters": document.total_characters,
        "total_words": document.total_words,
    }