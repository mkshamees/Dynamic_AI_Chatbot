from backend.app.agents.tool import Tool
from backend.app.agents.registry import tool_registry


class CalculatorTool(Tool):

    name = "calculator"

    description = "Performs calculations."

    def run(self, query: str):

        expression = (

            query.lower()

            .replace("calculate", "")

            .strip()

        )

        try:

            answer = eval(expression)

            return f"The answer is {answer}"

        except Exception:

            return "Invalid mathematical expression."


tool_registry.register(
    CalculatorTool()
)