import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import {
    streamMessage,
    getConversations,
    getConversation,
} from "../api/api";

import ChatBox from "../components/ChatBox";

function Chat() {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" />;
    }

    const [messages, setMessages] = useState([]);

    const [conversations, setConversations] = useState([]);

    const [conversationId, setConversationId] = useState(null);

    const [loading, setLoading] = useState(false);

    const [activeDocument, setActiveDocument] = useState(null);

    // ======================================
    // Load Conversations
    // ======================================

    const loadConversations = async () => {

        try {

            const response = await getConversations();

            setConversations(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    // ======================================
    // Load Conversation
    // ======================================

    const loadConversation = async (id) => {

        try {

            const response = await getConversation(id);

            const history = response.data.map((msg) => ({

                role: msg.sender,

                content: msg.content,

            }));

            setMessages(history);

            setConversationId(id);

        }

        catch (err) {

            console.log(err);

        }

    };

    // ======================================
    // New Chat
    // ======================================

    const newChat = () => {

        setConversationId(null);

        setMessages([]);

    };

    // ======================================
    // Conversation Deleted
    // ======================================

    const handleConversationDeleted = (deletedId) => {

        setConversations((prev) =>
            prev.filter(
                (conversation) =>
                    conversation.id !== deletedId
            )
        );

        if (conversationId === deletedId) {

            setConversationId(null);

            setMessages([]);

        }

    };

    // ======================================
    // STREAM MESSAGE
    // ======================================

    const handleSendMessage = async (text) => {

        // User message

        setMessages((prev) => [

            ...prev,

            {

                role: "user",

                content: text,

            },

            {

                role: "assistant",

                content: "",

            },

        ]);

        setLoading(true);

        try {

            await streamMessage(

                {

                    message: text,

                    conversation_id: conversationId,

                    document_id: activeDocument,

                },

                // Token callback

                (token) => {

                    setMessages((prev) => {

                        const updated = [...prev];

                        updated[updated.length - 1].content += token;

                        return updated;

                    });

                },

                // Conversation callback

                (id) => {

                    setConversationId(id);

                },

                // Done callback

                () => {

                    loadConversations();

                    setLoading(false);

                }

            );

        }

        catch (err) {

            console.log(err);

            setMessages((prev) => {

                const updated = [...prev];

                updated[updated.length - 1].content =

                    "Something went wrong.";

                return updated;

            });

            setLoading(false);

        }

    };

    // ======================================
    // Initial Load
    // ======================================

    useEffect(() => {

        loadConversations();

    }, []);

    return (

        <ChatBox

            conversations={conversations}

            messages={messages}

            conversationId={conversationId}

            onSend={handleSendMessage}

            onSelectConversation={loadConversation}

            onNewChat={newChat}

            onConversationDeleted={handleConversationDeleted}

            loading={loading}

            activeDocument={activeDocument}

            setActiveDocument={setActiveDocument}

        />

    );

}

export default Chat;