import os
import shutil

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Depends,
)

from sqlalchemy.orm import Session

from backend.app.database.session import get_db
from backend.app.auth.dependencies import get_current_user
from backend.app.models.user import User
from backend.app.models.document import Document

from backend.app.rag.document_service import (
    index_document,
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)

UPLOAD_FOLDER = "backend/app/uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True,
)

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx",
    ".txt",
    ".csv",
    ".xlsx",
}


# ======================================================
# Upload Document
# ======================================================

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    extension = os.path.splitext(
        file.filename
    )[1].lower()

    if extension not in ALLOWED_EXTENSIONS:

        raise HTTPException(
            status_code=400,
            detail="Unsupported file type.",
        )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename,
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )

    result = index_document(
        db=db,
        user_id=current_user.id,
        filename=file.filename,
        file_path=file_path,
    )

    return {
        "message": "Document uploaded successfully.",
        **result,
    }


# ======================================================
# List User Documents
# ======================================================

@router.get("/")
def list_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    docs = (
        db.query(Document)
        .filter(
            Document.user_id == current_user.id
        )
        .order_by(Document.created_at.desc())
        .all()
    )

    return docs


# ======================================================
# Delete Document
# ======================================================

@router.delete("/{document_id}")
def delete_document(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    doc = (
        db.query(Document)
        .filter(
            Document.document_id == document_id,
            Document.user_id == current_user.id,
        )
        .first()
    )

    if not doc:

        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    if os.path.exists(doc.file_path):

        os.remove(doc.file_path)

    db.delete(doc)
    db.commit()

    return {
        "message": "Document deleted successfully.",
    }