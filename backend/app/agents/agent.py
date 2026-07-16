from backend.app.agents.router import tool_router
from backend.app.agents.registry import tool_registry


class Agent:

    """
    Central AI Agent.

    Responsibilities

    • Decide whether a tool is needed
    • Execute the tool
    • Return the result
    """

    def execute(
        self,
        query: str,
    ):

        tool_name = tool_router.choose_tool(query)

        if tool_name is None:

            return None

        tool = tool_registry.get(tool_name)

        if tool is None:

            return None

        return tool.run(query)


agent = Agent()