import { useMemo, useState, useEffect } from "react";

import "./Sidebar.css";

import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";
import ConversationList from "./ConversationList";
import DocumentList from "./DocumentList";
import UserPanel from "./UserPanel";

import authService from "../../services/authService";

function Sidebar({

    conversations,

    activeConversation,

    onSelectConversation,

    onNewChat,

    activeDocument,

    setActiveDocument,

}) {

    const [user, setUser] = useState(null);

    const [darkMode, setDarkMode] = useState(false);

    const [documents, setDocuments] = useState([]);

    const [search, setSearch] = useState("");

    // ==========================================
    // Load Logged-in User
    // ==========================================

    useEffect(() => {

        const loadUser = async () => {

            const currentUser = await authService.getUser();

            setUser(currentUser);

        };

        loadUser();

    }, []);

    // ==========================================
    // Filter Conversations
    // ==========================================

    const filteredConversations = useMemo(() => {

        return conversations.filter(

            (conversation) =>

                (

                    conversation.title ||

                    `Conversation ${conversation.id}`

                )

                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    )

        );

    }, [search, conversations]);

    return (

        <aside className="sidebar">

            <SidebarHeader

                onNewChat={onNewChat}

            />

            <div className="sidebar-content">

                <SidebarSearch

                    search={search}

                    setSearch={setSearch}

                />

                <ConversationList

                    conversations={filteredConversations}

                    activeConversation={activeConversation}

                    onSelectConversation={onSelectConversation}

                />

                <DocumentList

                    documents={documents}

                    setDocuments={setDocuments}

                    activeDocument={activeDocument}

                    setActiveDocument={setActiveDocument}

                />

                <UserPanel

                    user={user}

                    darkMode={darkMode}

                    setDarkMode={setDarkMode}

                    onLogout={authService.logout}

                />

            </div>

        </aside>

    );

}

export default Sidebar;