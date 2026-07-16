from openai import OpenAI
from groq import Groq

from app.config.settings import settings


class AIEngine:
    """
    Supports:
    - Groq
    - OpenAI
    - Ollama
    """

    def __init__(self):

        self.provider = settings.AI_PROVIDER.lower()

        print("\n========== AI ENGINE ==========")
        print("Provider:", self.provider)

        if self.provider == "groq":

            self.client = Groq(
                api_key=settings.GROQ_API_KEY
            )

            self.model = settings.GROQ_MODEL

        elif self.provider == "openai":

            self.client = OpenAI(
                api_key=settings.OPENAI_API_KEY
            )

            self.model = settings.OPENAI_MODEL

        elif self.provider == "ollama":

            self.client = OpenAI(
                base_url=settings.OLLAMA_BASE_URL,
                api_key="ollama",
            )

            self.model = settings.OLLAMA_MODEL

        else:

            raise ValueError(
                f"Unsupported AI provider: {self.provider}"
            )

        print("Model:", self.model)
        print("===============================\n")

    # =====================================================
    # BUILD CHAT MESSAGES
    # =====================================================

    def build_messages(
        self,
        user_message: str,
        conversation_history: list | None = None,
        memory_prompt: str = "",
        document_prompt: str = "",
    ):

        system_prompt = """
You are Dynamic AI, an intelligent assistant.

Rules:

1. Always answer naturally and professionally.

2. Use previous conversation whenever useful.

3. Use USER MEMORY whenever relevant.

4. Use DOCUMENT KNOWLEDGE whenever it contains information that helps answer the user's question.

5. If DOCUMENT KNOWLEDGE contains the answer, base your answer on it.

6. Never invent facts that are not present in memory or documents.

7. If the answer is not available in the uploaded documents, answer using your own knowledge. If the user specifically asked about the uploaded document, politely mention that the information was not found in the uploaded document.

8. Do NOT mention prompts, RAG, embeddings, vector databases or internal systems.

9. Speak naturally.
"""

        if memory_prompt:

            system_prompt += f"""

================ USER MEMORY ================

{memory_prompt}
"""

        if document_prompt:

            system_prompt += f"""

================ DOCUMENT KNOWLEDGE ================

{document_prompt}
"""

        messages = [
            {
                "role": "system",
                "content": system_prompt,
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

        return messages

    # =====================================================
    # GENERATE RESPONSE
    # =====================================================

    def generate_response(
        self,
        user_message: str,
        conversation_history: list | None = None,
        memory_prompt: str = "",
        document_prompt: str = "",
    ) -> str:

        messages = self.build_messages(
            user_message=user_message,
            conversation_history=conversation_history,
            memory_prompt=memory_prompt,
            document_prompt=document_prompt,
        )

        try:

            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.3,
                max_tokens=700,
            )

            return response.choices[0].message.content.strip()

        except Exception as e:

            print("\n========== AI ERROR ==========")
            print(e)
            print("==============================\n")

            return f"AI Provider Error ({self.provider}): {str(e)}"

    # =====================================================
    # STREAM RESPONSE
    # =====================================================

    def stream_response(
        self,
        user_message: str,
        conversation_history: list | None = None,
        memory_prompt: str = "",
        document_prompt: str = "",
    ):

        messages = self.build_messages(
            user_message=user_message,
            conversation_history=conversation_history,
            memory_prompt=memory_prompt,
            document_prompt=document_prompt,
        )

        try:

            stream = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.3,
                max_tokens=700,
                stream=True,
            )

            for chunk in stream:

                if not chunk.choices:
                    continue

                delta = chunk.choices[0].delta

                if delta is None:
                    continue

                text = getattr(delta, "content", None)

                if text:
                    yield text

        except Exception as e:

            print("\n========== STREAM ERROR ==========")
            print(e)
            print("==================================\n")

            yield f"\nAI Provider Error ({self.provider}): {str(e)}"


# =====================================================
# GLOBAL INSTANCE
# =====================================================

ai_engine = AIEngine()