import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import "./Sidebar.css";

import {
  getDocuments,
  uploadDocument,
  deleteDocument,
  deleteConversation,
  getConversations,
  searchConversations,
} from "../api/api";

function Sidebar({
  conversations,
  activeConversation,
  onSelectConversation,
  onNewChat,
  onConversationDeleted,
}) {

  const [documents, setDocuments] = useState([]);

  const [uploading, setUploading] = useState(false);

  const [search, setSearch] = useState("");

  const [displayConversations, setDisplayConversations] = useState(conversations);

  const fileInput = useRef(null);

  // ==========================================
  // Sync conversations from parent
  // ==========================================

  useEffect(() => {

    setDisplayConversations(conversations);

  }, [conversations]);

  // ==========================================
  // Search Conversations
  // ==========================================

  useEffect(() => {

    const timer = setTimeout(async () => {

      try {

        if (!search.trim()) {

          const res = await getConversations();

          setDisplayConversations(res.data);

          return;

        }

        const res = await searchConversations(search);

        setDisplayConversations(res.data);

      }

      catch (err) {

        console.error(err);

      }

    }, 300);

    return () => clearTimeout(timer);

  }, [search]);

  // ==========================================
  // Load Documents
  // ==========================================

  const loadDocuments = async () => {

    try {

      const response = await getDocuments();

      setDocuments(response.data);

    }

    catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {

    loadDocuments();

  }, []);

  // ==========================================
  // Upload Document
  // ==========================================

  const handleUpload = async (event) => {

    const file = event.target.files[0];

    if (!file) return;

    setUploading(true);

    try {

      await uploadDocument(file);

      await loadDocuments();

      alert("Document uploaded successfully.");

    }

    catch (err) {

      console.error(err);

      alert("Upload failed.");

    }

    setUploading(false);

    event.target.value = "";

  };

  // ==========================================
  // Delete Document
  // ==========================================

  const handleDeleteDocument = async (id) => {

    if (!window.confirm("Delete this document?")) return;

    try {

      await deleteDocument(id);

      await loadDocuments();

    }

    catch (err) {

      console.error(err);

    }

  };

  // ==========================================
  // Delete Conversation
  // ==========================================

  const handleDeleteConversation = async (
    event,
    conversationId
  ) => {

    event.stopPropagation();

    if (!window.confirm("Delete this conversation?")) return;

    try {

      await deleteConversation(conversationId);

      setDisplayConversations((prev) =>
        prev.filter((c) => c.id !== conversationId)
      );

      onConversationDeleted?.(conversationId);

    }

    catch (err) {

      console.error(err);

      alert("Failed to delete conversation.");

    }

  };

  return (

    <div className="sidebar">

        <h2>🤖 Dynamic AI</h2>

        {/* Search */}

        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="new-chat-btn"
          onClick={onNewChat}
        >
          ＋ New Chat
        </button>

        {/* Conversations */}

        <div {/* Conversations */}

  <div className="conversation-list">

      {Object.entries(groupedConversations).map(

          ([group, items]) => (

              items.length > 0 && (

                  <div key={group}>

                      <div className="conversation-group">

                          {group === "today" && "Today"}

                          {group === "yesterday" && "Yesterday"}

                          {group === "week" && "Last 7 Days"}

                          {group === "month" && "Last 30 Days"}

                          {group === "older" && "Older"}

                      </div>

                      {items.map((conversation) => (

                          <div

                              key={conversation.id}

                              className={`conversation ${
                                  activeConversation === conversation.id
                                      ? "active"
                                      : ""
                              }`}

                              onClick={() =>
                                  onSelectConversation(conversation.id)
                              }

                          >

                              <span>

                                  💬 {conversation.title || `Chat ${conversation.id}`}

                              </span>

                              <button

                                  className="delete-btn"

                                  onClick={(event) =>
                                      handleDeleteConversation(
                                          event,
                                          conversation.id
                                      )
                                  }

                              >
                                  🗑
                              </button>

                          </div>

                      ))}

                  </div>

              )

          )

      )}

      </div>

      <hr />

      {/* Documents */}

      <h3>📄 Documents</h3>

      <button
        className="new-chat-btn"
        onClick={() => fileInput.current.click()}
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>

      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleUpload}
        accept=".pdf,.docx,.txt,.csv,.xlsx"
      />

      <div className="conversation-list">

        {documents.length === 0 ? (

          <p className="empty-text">

            No documents uploaded

          </p>

        ) : (

          documents.map((doc) => (

            <div
              key={doc.id}
              className="conversation"
            >

              <span>

                📄 {doc.filename}

              </span>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDeleteDocument(doc.id)
                }
              >
                🗑
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Sidebar;