from sqlalchemy.orm import Session

from backend.app.models.document import Document


class DocumentRepository:

    # ==========================================
    # Create
    # ==========================================

    def create(
        self,
        db: Session,
        user_id: int,
        document_id: str,
        filename: str,
        file_path: str,
        chunks: int,
    ):

        document = Document(

            user_id=user_id,

            document_id=document_id,

            filename=filename,

            file_path=file_path,

            chunks=chunks,

        )

        db.add(document)

        db.commit()

        db.refresh(document)

        return document

    # ==========================================
    # Get by Document ID
    # ==========================================

    def get_by_document_id(
        self,
        db: Session,
        document_id: str,
    ):

        return (

            db.query(Document)

            .filter(
                Document.document_id == document_id
            )

            .first()

        )

    # ==========================================
    # List User Documents
    # ==========================================

    def list_user_documents(
        self,
        db: Session,
        user_id: int,
    ):

        return (

            db.query(Document)

            .filter(
                Document.user_id == user_id
            )

            .order_by(
                Document.created_at.desc()
            )

            .all()

        )

    # ==========================================
    # Delete
    # ==========================================

    def delete(
        self,
        db: Session,
        document: Document,
    ):

        db.delete(document)

        db.commit()

    # ==========================================
    # Rename
    # ==========================================

    def rename(
        self,
        db: Session,
        document: Document,
        new_name: str,
    ):

        document.filename = new_name

        db.commit()

        db.refresh(document)

        return document


document_repository = DocumentRepository()