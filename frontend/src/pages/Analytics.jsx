import { useEffect, useState } from "react";

import {
    getAnalyticsOverview,
    getConversationAnalytics,
    getMessageAnalytics,
    getDocumentAnalytics,
    getMemoryAnalytics,
    getSystemAnalytics,
    getAIUsage,
} from "../api/api";

import OverviewCards from "../components/analytics/OverviewCards";
import ConversationChart from "../components/analytics/ConversationChart";
import MessageChart from "../components/analytics/MessageChart";
import DocumentStats from "../components/analytics/DocumentStats";
import MemoryStats from "../components/analytics/MemoryStats";
import SystemStats from "../components/analytics/SystemStats";
import ActivityBarChart from "../components/analytics/ActivityBarChart";
import UsagePieChart from "../components/analytics/UsagePieChart";
import AIUsageCard from "../components/analytics/AIUsageCard";
import DocumentPieChart from "../components/analytics/DocumentPieChart";
import StorageCard from "../components/analytics/StorageCard";
import DocumentStatsCard from "../components/analytics/DocumentStatsCard";
import RecentUploads from "../components/analytics/RecentUploads";

function Analytics() {

    const [overview, setOverview] = useState(null);
    const [conversationStats, setConversationStats] = useState([]);
    const [messageStats, setMessageStats] = useState([]);
    const [documentStats, setDocumentStats] = useState(null);
    const [memoryStats, setMemoryStats] = useState(null);
    const [systemStats, setSystemStats] = useState(null);
    const [aiUsage, setAIUsage] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAnalytics();

    }, []);

    async function loadAnalytics() {

        try {

            const [

                overviewRes,
                conversationRes,
                messageRes,
                documentRes,
                memoryRes,
                systemRes,
                aiUsageRes,

            ] = await Promise.all([

                getAnalyticsOverview(),
                getConversationAnalytics(),
                getMessageAnalytics(),
                getDocumentAnalytics(),
                getMemoryAnalytics(),
                getSystemAnalytics(),
                getAIUsage(),

            ]);

            setOverview(overviewRes.data);
            setConversationStats(conversationRes.data);
            setMessageStats(messageRes.data);
            setDocumentStats(documentRes.data);
            setMemoryStats(memoryRes.data);
            setSystemStats(systemRes.data);
            setAIUsage(aiUsageRes.data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    background: "#343541",
                    color: "white",
                    padding: 40,
                }}
            >

                Loading Analytics...

            </div>

        );

    }

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#343541",
                color: "white",
                padding: 30,
            }}
        >

            <h1
                style={{
                    marginBottom: 30,
                }}
            >

                📊 Analytics Dashboard

            </h1>

            <OverviewCards
                overview={overview}
            />

            <div style={{ marginTop: 30 }}>

                <ConversationChart
                    data={conversationStats}
                />

            </div>

            <div style={{ marginTop: 30 }}>

                <MessageChart
                    data={messageStats}
                />
                <div
    style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 25,
        marginTop: 30,
    }}
>

    <UsagePieChart
        documents={documentStats?.total_documents || 0}
        memories={memoryStats?.total_memories || 0}
    />

    <ActivityBarChart
        data={conversationStats}
    />

    <AIUsageCard
        data={aiUsage}
    />

    <DocumentStatsCard
        data={documentStats}
    />

    <StorageCard
        data={documentStats}
    />

    <DocumentPieChart
        data={documentStats}
    />

    <RecentUploads
        data={documentStats?.recent_uploads || []}
    />

</div>

            </div>

            <DocumentStats
                data={documentStats}
            />

            <MemoryStats
                data={memoryStats}
            />

            <SystemStats
                data={systemStats}
            />

        </div>

    );

}

export default Analytics;