import re

from app.services.memory_service import memory_service


def extract_memory(
    db,
    user_id,
    user_message,
):
    """
    Automatically extract important user information
    and store it as semantic memory.
    """

    text = user_message.lower()

    patterns = [

        r"my name is (.+)",

        r"i am (\d+) years old",

        r"i live in (.+)",

        r"i am from (.+)",

        r"my favorite subject is (.+)",

        r"my favourite subject is (.+)",

        r"i teach (.+)",

        r"i work as (.+)",

        r"i am a (.+)",

        r"my favourite colour is (.+)",

        r"my favorite colour is (.+)",

        r"my favorite color is (.+)",

        r"my favourite color is (.+)",

    ]

    for pattern in patterns:

        match = re.search(
            pattern,
            text,
        )

        if match:

            # Save the ORIGINAL sentence as semantic memory
            memory_service.save_user_memory(
                user_id=user_id,
                text=user_message,
            )

            # Only save once
            break