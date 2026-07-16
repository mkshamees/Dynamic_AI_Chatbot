class ToolRouter:
    """
    Chooses which tool should execute.
    """

    def choose_tool(self, query: str):

        query = query.lower()

        if "document" in query:

            return "documents"

        if "memory" in query:

            return "memory"

        if "conversation" in query:

            return "conversation"

        if "calculate" in query:

            return "calculator"

        return None


tool_router = ToolRouter()