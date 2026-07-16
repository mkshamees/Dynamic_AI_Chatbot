from backend.app.agents.tool import Tool
from backend.app.agents.registry import tool_registry


class MemoryTool(Tool):

    name = "memory"

    description = "Search long-term memory."

    def run(self, query: str):

        return (

            "Memory tool activated."

        )


tool_registry.register(
    MemoryTool()
)