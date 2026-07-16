import { useEffect, useRef } from "react";

import "./ChatWindow.css";

import Message from "./Message";
import ChatInput from "./ChatInput";

import { exportConversation } from "../api/api";

function ChatWindow({

    messages,

    onSend,

    loading,

    conversationId,

}) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth",

        });

    }, [messages]);

    const handleExport = async () => {

        if (!conversationId) {

            alert("No conversation to export.");

            return;

        }

        try {

            const response = await exportConversation(
                conversationId
            );

            const blob = new Blob(
                [response.data],
                {
                    type: "text/markdown",
                }
            );

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download = `conversation_${conversationId}.md`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Failed to export conversation.");

        }

    };

    return (

        <div className="chat-window">

            <header className="chat-header">

                <div>

                    <h2>🤖 Dynamic AI</h2>

                    <span>AI Assistant</span>

                </div>

                <button

                    className="export-btn"

                    disabled={!conversationId}

                    onClick={handleExport}

                >

                    Export Chat

                </button>

            </header>

            <section className="chat-body">

                {

                    messages.length === 0 ?

                    (

                        <div className="welcome">

                            <h1>

                                👋 Welcome

                            </h1>

                            <p>

                                What would you like to work on today?

                            </p>

                            <div className="suggestions">

                                <div className="card">

                                    💻 Programming

                                </div>

                                <div className="card">

                                    📚 Education

                                </div>

                                <div className="card">

                                    🧪 Science

                                </div>

                                <div className="card">

                                    ✍ Content Writing

                                </div>

                            </div>

                        </div>

                    )

                    :

                    (

                        messages.map((message,index)=>(

                            <Message

                                key={index}

                                role={message.role}

                                content={message.content}

                            />

                        ))

                    )

                }

                {

                    loading &&

                    (

                        <div className="typing">

                            Dynamic AI is thinking...

                        </div>

                    )

                }

                <div ref={bottomRef}></div>

            </section>

            <footer className="chat-footer">

                <ChatInput

                    onSend={onSend}

                />

            </footer>

        </div>

    );

}

export default ChatWindow;