from app.database.base import Base
from app.database.connection import engine

from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message
from app.models.memory import Memory
from app.models.document import Document


def init_db():
    Base.metadata.create_all(bind=engine)

    print("\n===================================")
    print("Database initialized successfully.")
    print("===================================\n")


if __name__ == "__main__":
    init_db()