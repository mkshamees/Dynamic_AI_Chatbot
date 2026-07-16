import { useEffect, useState } from "react";

import {
    getCurrentUser,
    getAnalyticsOverview,
    getConversationAnalytics,
    getMessageAnalytics,
    getDocumentAnalytics,
    getMemoryAnalytics,
    getSystemAnalytics,
    getAIUsage,
} from "../api/api";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import QuickStats from "../components/dashboard/QuickStats";
import QuickActions from "../components/dashboard/QuickActions";
import AllInsight from "../components/dashboard/AllInsight";
import ProviderStatus from "../components/dashboard/ProviderStatus";
import RecentActivity from "../components/dashboard/RecentActivity";

function Dashboard() {

    const [user, setUser] = useState(null);

    const [overview, setOverview] = useState(null);

    const [conversationStats, setConversationStats] = useState([]);

    const [messageStats, setMessageStats] = useState([]);

    const [documentStats, setDocumentStats] = useState(null);

    const [memoryStats, setMemoryStats] = useState(null);

    const [systemStats, setSystemStats] = useState(null);

    const [aiUsage, setAIUsage] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            setLoading(true);

            setError("");

            const [

                userRes,
                overviewRes,
                conversationRes,
                messageRes,
                documentRes,
                memoryRes,
                systemRes,
                aiUsageRes,

            ] = await Promise.all([

                getCurrentUser(),

                getAnalyticsOverview(),

                getConversationAnalytics(),

                getMessageAnalytics(),

                getDocumentAnalytics(),

                getMemoryAnalytics(),

                getSystemAnalytics(),

                getAIUsage(),

            ]);

            setUser(userRes.data);

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

            setError("Unable to load dashboard.");

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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 24,
                }}
            >

                Loading Dashboard...

            </div>

        );

    }

    if (error) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    background: "#343541",
                    color: "#ff6b6b",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 24,
                }}
            >

                {error}

            </div>

        );

    }    return (

        <div
            style={{
                background: "#343541",
                minHeight: "100vh",
                padding: "30px",
                color: "white",
            }}
        >

            <WelcomeBanner
                user={user}
            />

            <div
                style={{
                    marginTop: 30,
                }}
            >

                <QuickStats
                    overview={overview}
                    aiUsage={aiUsage}
                />

            </div>

            <div
                style={{
                    marginTop: 30,
                }}
            >

                <QuickActions />

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: 25,
                    marginTop: 30,
                }}
            >

                <div>

                    <AllInsight
                        overview={overview}
                        documents={documentStats}
                        memories={memoryStats}
                        aiUsage={aiUsage}
                    />

                </div>

                <div>

                    <ProviderStatus
                        system={systemStats}
                        aiUsage={aiUsage}
                    />

                </div>

            </div>

            <div
                style={{
                    marginTop: 30,
                }}
            >

                <RecentActivity
                    overview={overview}
                    documents={documentStats}
                    memories={memoryStats}
                    aiUsage={aiUsage}
                />

            </div>

        </div>

    );

}

export default Dashboard;