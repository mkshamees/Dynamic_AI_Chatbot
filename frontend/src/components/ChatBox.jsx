import "./ChatBox.css";

import Sidebar from "./sidebar/Sidebar";
import ChatWindow from "./ChatWindow";

function ChatBox({

    conversations,

    messages,

    conversationId,

    onSend,

    onSelectConversation,

    onNewChat,

    onConversationDeleted,

    loading,

    activeDocument,

    setActiveDocument,

}) {

    const selectConversation = (id) => {

        onSelectConversation(id);

    };

    const handleConversationDeleted = (deletedId) => {

        if (onConversationDeleted) {

            onConversationDeleted(deletedId);

        }

    };

    return (

        <div className="chat-layout">

            <aside className="chat-sidebar">

                <Sidebar

                    conversations={conversations}

                    activeConversation={conversationId}

                    onSelectConversation={selectConversation}

                    onNewChat={onNewChat}

                    onConversationDeleted={handleConversationDeleted}

                    activeDocument={activeDocument}

                    setActiveDocument={setActiveDocument}

                />

            </aside>

            <main className="chat-main">

                <ChatWindow

                    messages={messages}

                    onSend={onSend}

                    loading={loading}

                    conversationId={conversationId}

                />

            </main>

        </div>

    );

}

export default ChatBox;