from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ==========================================
    # APPLICATION
    # ==========================================
    APP_NAME: str
    APP_VERSION: str

    # ==========================================
    # SECURITY
    # ==========================================
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # ==========================================
    # DATABASE
    # ==========================================
    DATABASE_URL: str

    # ==========================================
    # AI PROVIDER
    # ==========================================
    AI_PROVIDER: str = "groq"

    # ==========================================
    # GROQ
    # ==========================================
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    # ==========================================
    # OPENAI
    # ==========================================
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4.1-mini"

    # ==========================================
    # OLLAMA
    # ==========================================
    OLLAMA_BASE_URL: str = "http://localhost:11434/v1"
    OLLAMA_MODEL: str = "llama3.2"

    # ==========================================
    # SETTINGS
    # ==========================================
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()