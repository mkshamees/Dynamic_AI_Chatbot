from app.chatbot.ai_engine import ai_engine


class TitleService:
    """
    Generates short AI-powered conversation titles.
    """

    def generate_title(self, first_message: str) -> str:

        prompt = f"""
Generate a concise conversation title.

Rules:
- 3 to 6 words
- No quotation marks
- No punctuation at the end
- Use title case
- Summarize the user's request

User:

{first_message}
"""

        try:

            title = ai_engine.generate_response(
                user_message=prompt,
                conversation_history=[],
                memory_prompt="",
                document_prompt="",
            )

            title = title.strip()

            if len(title) > 60:
                title = title[:60]

            return title

        except Exception:

            return first_message[:40]


title_service = TitleService()