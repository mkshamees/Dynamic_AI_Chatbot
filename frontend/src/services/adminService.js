import api from "../api/api";

class AdminService {

    // ==========================================
    // Dashboard
    // ==========================================

    async dashboard() {

        const res = await api.get("/admin/dashboard");

        return res.data;

    }

    // ==========================================
    // Users
    // ==========================================

    async users() {

        const res = await api.get("/admin/users");

        return res.data;

    }

    async activateUser(id) {

        return api.patch(`/admin/users/${id}/activate`);

    }

    async deactivateUser(id) {

        return api.patch(`/admin/users/${id}/deactivate`);

    }

    async promoteUser(id) {

        return api.patch(`/admin/users/${id}/promote`);

    }

    async demoteUser(id) {

        return api.patch(`/admin/users/${id}/demote`);

    }

    async deleteUser(id) {

        return api.delete(`/admin/users/${id}`);

    }

    // ==========================================
    // Conversations
    // ==========================================

    async conversations() {

        const res = await api.get("/admin/conversations");

        return res.data;

    }

    async conversation(id) {

        const res = await api.get(`/admin/conversations/${id}`);

        return res.data;

    }

    async deleteConversation(id) {

        return api.delete(`/admin/conversations/${id}`);

    }

    // ==========================================
    // Documents
    // ==========================================

    async documents() {

        const res = await api.get("/admin/documents");

        return res.data;

    }

    async documentStatistics() {

        const res = await api.get("/admin/documents/statistics");

        return res.data;

    }

    async deleteDocument(id) {

        return api.delete(`/admin/documents/${id}`);

    }

    // ==========================================
    // Memory
    // ==========================================

    async memories() {

        const res = await api.get("/admin/memories");

        return res.data;

    }

    async memoryStatistics() {

        const res = await api.get("/admin/memories/statistics");

        return res.data;

    }

    async deleteMemory(id) {

        return api.delete(`/admin/memories/${id}`);

    }

}

export default new AdminService();