import axios from "axios";

// ======================================================
// Axios Instance
// ======================================================

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

// ======================================================
// Automatically Attach JWT
// ======================================================

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

// ======================================================
// AUTHENTICATION
// ======================================================

export const register = (data) =>
    api.post("/auth/register", data);

export const login = (data) =>
    api.post("/auth/login", data);

export const getCurrentUser = () =>
    api.get("/auth/me");

// ======================================================
// CHAT
// ======================================================

export const sendMessage = (data) =>
    api.post("/chat/", data);

// ======================================================
// STREAMING CHAT
// ======================================================

export const streamMessage = async (

    data,

    onToken,

    onConversation,

    onDone,

) => {

    const token = localStorage.getItem("token");

    const response = await fetch(

        "http://127.0.0.1:8000/chat/stream",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`,

            },

            body: JSON.stringify(data),

        }

    );

    if (!response.ok) {

        throw new Error("Streaming request failed.");

    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {

        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, {

            stream: true,

        });

        const events = buffer.split("\n\n");

        buffer = events.pop();

        for (const event of events) {

            const lines = event.split("\n");

            for (const line of lines) {

                if (!line.startsWith("data:")) continue;

                const payload = line.substring(5).trim();

                if (payload === "[DONE]") {

                    onDone?.();

                    continue;

                }

                try {

                    const json = JSON.parse(payload);

                    if (json.conversation_id) {

                        onConversation?.(

                            json.conversation_id

                        );

                    }

                    if (json.token) {

                        onToken?.(

                            json.token

                        );

                    }

                }

                catch (err) {

                    console.error(err);

                }

            }

        }

    }

};

// ======================================================
// USER CONVERSATIONS
// ======================================================

export const getConversations = () =>
    api.get("/chat/conversations");

export const getConversation = (id) =>
    api.get(`/chat/conversations/${id}`);

export const searchConversations = (query) =>
    api.get(
        `/chat/search?q=${encodeURIComponent(query)}`
    );

export const deleteConversation = (id) =>
    api.delete(`/chat/conversations/${id}`);

export const exportConversation = (id) =>
    api.get(
        `/chat/export/${id}`,
        {
            responseType: "blob",
        }
    );

// ======================================================
// DOCUMENTS
// ======================================================

export const uploadDocument = (file) => {

    const formData = new FormData();

    formData.append("file", file);

    return api.post(

        "/documents/upload",

        formData,

        {

            headers: {

                "Content-Type":

                    "multipart/form-data",

            },

        }

    );

};

export const getDocuments = () =>
    api.get("/documents");

export const deleteDocument = (id) =>
    api.delete(`/documents/${id}`);

// ======================================================
// ANALYTICS
// ======================================================

export const getAnalyticsOverview = () =>
    api.get("/analytics/overview");

export const getConversationAnalytics = () =>
    api.get("/analytics/conversations");

export const getMessageAnalytics = () =>
    api.get("/analytics/messages");

export const getDocumentAnalytics = () =>
    api.get("/analytics/documents");

export const getMemoryAnalytics = () =>
    api.get("/analytics/memory");

export const getSystemAnalytics = () =>
    api.get("/analytics/system");

export const getAIUsage = () =>
    api.get("/analytics/ai-usage");

// ======================================================
// ADMIN DASHBOARD
// ======================================================

export const getAdminDashboard = () =>
    api.get("/admin/dashboard");

// ======================================================
// ADMIN USERS
// ======================================================

export const getAdminUsers = () =>
    api.get("/admin/users");

export const activateUser = (id) =>
    api.patch(`/admin/users/${id}/activate`);

export const deactivateUser = (id) =>
    api.patch(`/admin/users/${id}/deactivate`);

export const promoteUser = (id) =>
    api.patch(`/admin/users/${id}/promote`);

export const demoteUser = (id) =>
    api.patch(`/admin/users/${id}/demote`);

export const deleteUser = (id) =>
    api.delete(`/admin/users/${id}`);

// ======================================================
// ADMIN CONVERSATIONS
// ======================================================

export const getAdminConversations = () =>
    api.get("/admin/conversations");

export const getAdminConversation = (id) =>
    api.get(`/admin/conversations/${id}`);

export const deleteAdminConversation = (id) =>
    api.delete(`/admin/conversations/${id}`);

// ======================================================
// ADMIN DOCUMENTS
// ======================================================

export const getAdminDocuments = () =>
    api.get("/admin/documents");

export const getAdminDocumentStatistics = () =>
    api.get("/admin/documents/statistics");

export const deleteAdminDocument = (id) =>
    api.delete(`/admin/documents/${id}`);

// ======================================================
// ADMIN MEMORIES
// ======================================================

export const getAdminMemories = () =>
    api.get("/admin/memories");

export const getAdminMemoryStatistics = () =>
    api.get("/admin/memories/statistics");

export const deleteAdminMemory = (id) =>
    api.delete(`/admin/memories/${id}`);

// ======================================================
// EXPORT AXIOS
// ======================================================

export default api;