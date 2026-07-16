from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Session

from backend.app.models.user import User
from backend.app.models.conversation import Conversation
from backend.app.models.message import Message
from backend.app.models.document import Document
from backend.app.models.memory import Memory


class AdminService:

    # =====================================================
    # Dashboard Overview
    # =====================================================

    def dashboard_overview(
        self,
        db: Session,
    ):

        today = datetime.utcnow().date()

        return {

            "total_users": db.query(User).count(),

            "active_users": db.query(User).filter(
                User.is_active == True
            ).count(),

            "inactive_users": db.query(User).filter(
                User.is_active == False
            ).count(),

            "admins": db.query(User).filter(
                User.role == "admin"
            ).count(),

            "today_registrations": db.query(User).filter(
                func.date(User.created_at) == today
            ).count(),

            "today_logins": db.query(User).filter(
                func.date(User.last_login) == today
            ).count(),

        }
    
        # =====================================================
    # GET ALL USERS
    # =====================================================

    def get_all_users(
        self,
        db: Session,
    ):

        users = db.query(User).order_by(
            User.created_at.desc()
        ).all()

        return users


    # =====================================================
    # GET USER
    # =====================================================

    def get_user(
        self,
        db: Session,
        user_id: int,
    ):

        return (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )


    # =====================================================
    # ACTIVATE USER
    # =====================================================

    def activate_user(
        self,
        db: Session,
        user_id: int,
    ):

        user = self.get_user(db, user_id)

        if user is None:

            return None

        user.is_active = True

        db.commit()

        db.refresh(user)

        return user


    # =====================================================
    # DEACTIVATE USER
    # =====================================================

    def deactivate_user(
        self,
        db: Session,
        user_id: int,
    ):

        user = self.get_user(db, user_id)

        if user is None:

            return None

        user.is_active = False

        db.commit()

        db.refresh(user)

        return user


    # =====================================================
    # PROMOTE ADMIN
    # =====================================================

    def promote_admin(
        self,
        db: Session,
        user_id: int,
    ):

        user = self.get_user(db, user_id)

        if user is None:

            return None

        user.role = "admin"

        user.is_superuser = True

        db.commit()

        db.refresh(user)

        return user


    # =====================================================
    # REMOVE ADMIN
    # =====================================================

    def remove_admin(
        self,
        db: Session,
        user_id: int,
    ):

        user = self.get_user(db, user_id)

        if user is None:

            return None

        user.role = "user"

        user.is_superuser = False

        db.commit()

        db.refresh(user)

        return user


    # =====================================================
    # DELETE USER
    # =====================================================

    def delete_user(
        self,
        db: Session,
        user_id: int,
    ):

        user = self.get_user(db, user_id)

        if user is None:

            return False

        db.delete(user)

        db.commit()

        return True
    
        # =====================================================
    # ALL CONVERSATIONS
    # =====================================================

    def get_all_conversations(
        self,
        db: Session,
    ):

        conversations = (

            db.query(
                Conversation,
                User.username,
                User.email,
            )

            .join(
                User,
                Conversation.user_id == User.id,
            )

            .order_by(
                Conversation.created_at.desc()
            )

            .all()

        )

        output = []

        for conversation, username, email in conversations:

            output.append(

                {
                    "id": conversation.id,
                    "title": conversation.title,
                    "username": username,
                    "email": email,
                    "created_at": conversation.created_at,
                }

            )

        return output


    # =====================================================
    # LOAD CONVERSATION
    # =====================================================

    def load_conversation(
        self,
        db: Session,
        conversation_id: int,
    ):

        return (

            db.query(Message)

            .filter(
                Message.conversation_id == conversation_id
            )

            .order_by(
                Message.created_at.asc()
            )

            .all()

        )


    # =====================================================
    # DELETE CONVERSATION
    # =====================================================

    def delete_conversation(
        self,
        db: Session,
        conversation_id: int,
    ):

        conversation = (

            db.query(Conversation)

            .filter(
                Conversation.id == conversation_id
            )

            .first()

        )

        if conversation is None:

            return False

        db.query(Message).filter(

            Message.conversation_id == conversation_id

        ).delete()

        db.delete(conversation)

        db.commit()

        return True
    
        # =====================================================
    # ALL DOCUMENTS
    # =====================================================

    def get_all_documents(
        self,
        db: Session,
    ):

        return (

            db.query(Document)

            .order_by(
                Document.created_at.desc()
            )

            .all()

        )


    # =====================================================
    # DOCUMENT STATISTICS
    # =====================================================

    def document_statistics(
        self,
        db: Session,
    ):

        documents = db.query(Document).all()

        pdf = 0
        docx = 0
        txt = 0
        csv = 0
        xlsx = 0

        chunks = 0

        for doc in documents:

            name = doc.filename.lower()

            if name.endswith(".pdf"):
                pdf += 1

            elif name.endswith(".docx"):
                docx += 1

            elif name.endswith(".txt"):
                txt += 1

            elif name.endswith(".csv"):
                csv += 1

            elif name.endswith(".xlsx"):
                xlsx += 1

            chunks += doc.chunks

        return {

            "total_documents": len(documents),

            "total_chunks": chunks,

            "pdf_files": pdf,

            "docx_files": docx,

            "txt_files": txt,

            "csv_files": csv,

            "xlsx_files": xlsx,

        }


    # =====================================================
    # DELETE DOCUMENT
    # =====================================================

    def delete_document(
        self,
        db: Session,
        document_id: int,
    ):

        document = (

            db.query(Document)

            .filter(
                Document.id == document_id
            )

            .first()

        )

        if document is None:

            return False

        db.delete(document)

        db.commit()

        return True
    
        # =====================================================
    # ALL MEMORIES
    # =====================================================

    def get_all_memories(
        self,
        db: Session,
    ):

        return (

            db.query(Memory)

            .order_by(
                Memory.created_at.desc()
            )

            .all()

        )


    # =====================================================
    # MEMORY STATISTICS
    # =====================================================

    def memory_statistics(
        self,
        db: Session,
    ):

        total = db.query(Memory).count()

        users = (

            db.query(Memory.user_id)

            .distinct()

            .count()

        )

        return {

            "total_memories": total,

            "total_users_with_memories": users,

        }


    # =====================================================
    # DELETE MEMORY
    # =====================================================

    def delete_memory(
        self,
        db: Session,
        memory_id: int,
    ):

        memory = (

            db.query(Memory)

            .filter(
                Memory.id == memory_id
            )

            .first()

        )

        if memory is None:

            return False

        db.delete(memory)

        db.commit()

        return True


admin_service = AdminService()