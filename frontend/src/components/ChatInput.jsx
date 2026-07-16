import { useState } from "react";

import "./ChatInput.css";

function ChatInput({ onSend }) {

    const [message, setMessage] = useState("");

    const send = () => {

        if (!message.trim()) return;

        onSend(message);

        setMessage("");

    };

    return (

        <div className="chat-input-container">

            <textarea

                value={message}

                rows={1}

                placeholder="Message Dynamic AI..."

                onChange={(e) => setMessage(e.target.value)}

                onKeyDown={(e) => {

                    if (e.key === "Enter" && !e.shiftKey) {

                        e.preventDefault();

                        send();

                    }

                }}

            />

            <button

                className="send-btn"

                onClick={send}

                disabled={!message.trim()}

            >

                ➤

            </button>

        </div>

    );

}

export default ChatInput;