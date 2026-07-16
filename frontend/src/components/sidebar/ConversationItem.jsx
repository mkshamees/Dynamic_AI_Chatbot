import { FiMessageSquare } from "react-icons/fi";

function ConversationItem({

    conversation,

    active,

    onSelect,

}) {

    return (

        <div

            className={

                active

                    ? "conversation-item active"

                    : "conversation-item"

            }

            onClick={()=>

                onSelect(conversation.id)

            }

        >

            <FiMessageSquare />

            <span>

                {

                    conversation.title ||

                    `Conversation ${conversation.id}`

                }

            </span>

        </div>

    );

}

export default ConversationItem;