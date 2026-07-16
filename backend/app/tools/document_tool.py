from app.agents.tool import Tool
from app.agents.registry import tool_registry


class DocumentTool(Tool):

    name = "documents"

    description = "Search uploaded documents."

    def run(self, query: str):

        return (

            "Document tool activated.\n"

            "RAG search will execute here."

        )


tool_registry.register(
    DocumentTool()
)