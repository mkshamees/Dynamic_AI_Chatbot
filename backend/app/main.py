from fastapi import FastAPI

from backend.app.config.settings import settings
from backend.app.database.init_db import init_db

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Dynamic AI Chatbot Backend API",
)


@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def home():
    return {
        "status": "running",
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }