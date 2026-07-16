from typing import Dict

from backend.app.agents.tool import Tool


class ToolRegistry:

    def __init__(self):

        self.tools: Dict[str, Tool] = {}

    def register(self, tool: Tool):

        self.tools[tool.name] = tool

    def get(self, name):

        return self.tools.get(name)

    def all(self):

        return self.tools.values()


tool_registry = ToolRegistry()