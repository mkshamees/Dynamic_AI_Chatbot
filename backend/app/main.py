from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.auth import router as auth_router
from backend.app.api.chat import router as chat_router
from backend.app.api.analytics import router as analytics_router

# Old SQL Memory API
from backend.app.api.memory import router as memory_router

# New Document APIs
from backend.app.api.documents import router as document_router
from backend.app.api.rag import router as rag_router

from backend.app.config.settings import settings
from backend.app.database.init_db import init_db

from backend.app.admin.routes import router as admin_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Dynamic AI Chatbot Backend API",
)


# ==========================================
# CORS
# ==========================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# STARTUP
# ==========================================
@app.on_event("startup")
def startup():

    init_db()

    print("\n===================================")
    print("Database initialized successfully.")
    print("===================================\n")


# ==========================================
# ROUTERS
# ==========================================

# Authentication
app.include_router(auth_router)

# Chat
app.include_router(chat_router)

# Semantic Memory is now handled by ChromaDB
# Keep the old SQL Memory API disabled
# app.include_router(memory_router)

# Document Upload API
app.include_router(document_router)

# RAG Search API
app.include_router(rag_router)


app.include_router(analytics_router)


app.include_router(admin_router)


# ==========================================
# HOME
# ==========================================
@app.get("/")
def home():
    return {
        "status": "running",
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }