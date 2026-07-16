from app.agents.tool import Tool
from app.agents.registry import tool_registry


class ConversationTool(Tool):

    name = "conversation"

    description = "Search conversation history."

    def run(self, query: str):

        return (

            "Conversation tool activated."

        )


tool_registry.register(
    ConversationTool()
)