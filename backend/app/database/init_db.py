from backend.app.database.base import Base
from backend.app.database.connection import engine

from backend.app.models.user import User
from backend.app.models.conversation import Conversation
from backend.app.models.message import Message
from backend.app.models.memory import Memory
from backend.app.models.document import Document


def init_db():
    Base.metadata.create_all(bind=engine)

    print("\n===================================")
    print("Database initialized successfully.")
    print("===================================\n")


if __name__ == "__main__":
    init_db()