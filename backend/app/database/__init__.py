from backend.app.database.base import Base
from backend.app.database.connection import engine

# Import ALL models here
from backend.app.models.user import User
from backend.app.models.conversation import Conversation
from backend.app.models.message import Message
from backend.app.models.memory import Memory


def init_db():
    """
    Create all database tables.
    """
    Base.metadata.create_all(bind=engine)

    print("\n===================================")
    print("Database initialized successfully.")
    print("===================================\n")