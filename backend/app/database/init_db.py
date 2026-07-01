from backend.app.database.connection import engine
from backend.app.database.base import Base

# Import models so SQLAlchemy knows about them
from backend.app.models import User, Conversation, Message


def init_db():
    Base.metadata.create_all(bind=engine)