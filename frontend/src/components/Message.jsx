import { useState } from "react";

import "./Message.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

function Message({ role, content }) {

    const CodeBlock = ({ className, children }) => {

        const [copied, setCopied] = useState(false);

        const code = String(children).replace(/\n$/, "");

        const language =
            className?.replace("language-", "") || "text";

        const copyCode = async () => {

            await navigator.clipboard.writeText(code);

            setCopied(true);

            setTimeout(() => {

                setCopied(false);

            }, 2000);

        };

        return (

            <div className="code-container">

                <div className="code-header">

                    <span>{language}</span>

                    <button
                        className="copy-btn"
                        onClick={copyCode}
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>

                </div>

                <pre>

                    <code className={className}>

                        {code}

                    </code>

                </pre>

            </div>

        );

    };

    return (

        <div className={`message ${role}`}>

            <div className="avatar">

                {role === "user" ? "👤" : "🤖"}

            </div>

            <div className="message-content">

                <ReactMarkdown

                    remarkPlugins={[remarkGfm]}

                    rehypePlugins={[rehypeHighlight]}

                    components={{

                        code({ inline, className, children }) {

                            if (inline) {

                                return (

                                    <code className="inline-code">

                                        {children}

                                    </code>

                                );

                            }

                            return (

                                <CodeBlock className={className}>

                                    {children}

                                </CodeBlock>

                            );

                        },

                        a({ href, children }) {

                            return (

                                <a

                                    href={href}

                                    target="_blank"

                                    rel="noreferrer"

                                    className="message-link"

                                >

                                    {children}

                                </a>

                            );

                        },

                    }}

                >

                    {content}

                </ReactMarkdown>

            </div>

        </div>

    );

}

export default Message;