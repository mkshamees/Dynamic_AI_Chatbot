from openai import OpenAI

from backend.app.config.settings import settings


class AIEngine:
    """
    Handles communication with either OpenAI or Ollama.
    The provider is selected from the .env file.
    """

    def __init__(self):

        self.provider = settings.AI_PROVIDER.lower()

        if self.provider == "openai":

            if not settings.OPENAI_API_KEY:
                raise ValueError(
                    "OPENAI_API_KEY is missing in the .env file."
                )

            self.client = OpenAI(
                api_key=settings.OPENAI_API_KEY,
            )

            self.model = settings.OPENAI_MODEL

        elif self.provider == "ollama":

            self.client = OpenAI(
                base_url=settings.OLLAMA_BASE_URL,
                api_key="ollama",      # Required but ignored by Ollama
            )

            self.model = settings.OLLAMA_MODEL

        else:
            raise ValueError(
                f"Unsupported AI provider: {settings.AI_PROVIDER}"
            )

    def generate_response(
        self,
        user_message: str,
        conversation_history: list | None = None,
    ) -> str:

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a professional AI assistant for the Dynamic AI Chatbot. "
                    "Provide helpful, concise, and accurate responses."
                ),
            }
        ]

        if conversation_history:
            messages.extend(conversation_history)

        messages.append(
            {
                "role": "user",
                "content": user_message,
            }
        )

        try:

            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=500,
            )

            return response.choices[0].message.content.strip()

        except Exception as e:

            return (
                f"AI Provider Error ({self.provider}): "
                f"{str(e)}"
            )


ai_engine = AIEngine()