import {
    getAnalyticsOverview,
    getConversationAnalytics,
    getMessageAnalytics,
    getDocumentAnalytics,
    getMemoryAnalytics,
    getSystemAnalytics,
    getAIUsage,
} from "../api/api";

export async function fetchAnalytics() {

    const [
        overview,
        conversations,
        messages,
        documents,
        memories,
        system,
        ai,
    ] = await Promise.all([

        getAnalyticsOverview(),

        getConversationAnalytics(),

        getMessageAnalytics(),

        getDocumentAnalytics(),

        getMemoryAnalytics(),

        getSystemAnalytics(),

        getAIUsage(),

    ]);

    return {

        overview: overview.data,

        conversations: conversations.data,

        messages: messages.data,

        documents: documents.data,

        memories: memories.data,

        system: system.data,

        ai: ai.data,

    };

}