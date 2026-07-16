from abc import ABC, abstractmethod


class Tool(ABC):
    """
    Base class for every AI tool.
    """

    name = ""
    description = ""

    @abstractmethod
    def run(self, query: str):
        pass