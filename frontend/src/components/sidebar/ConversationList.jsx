import ConversationItem from "./ConversationItem";

function ConversationList({

    conversations,

    activeConversation,

    onSelectConversation,

}) {

    if(conversations.length===0){

        return(

            <div className="empty-list">

                No conversations yet.

            </div>

        );

    }

    return(

        <>

            <div className="sidebar-section-title">

                Conversations

            </div>

            {

                conversations.map(

                    (conversation)=>(

                        <ConversationItem

                            key={conversation.id}

                            conversation={conversation}

                            active={

                                activeConversation===conversation.id

                            }

                            onSelect={onSelectConversation}

                        />

                    )

                )

            }

        </>

    );

}

export default ConversationList;