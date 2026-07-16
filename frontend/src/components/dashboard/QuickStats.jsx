import {
    FiUsers,
    FiMessageSquare,
    FiFileText,
    FiCpu,
    FiDatabase,
    FiActivity,
} from "react-icons/fi";

import "./dashboard.css";

function QuickStats({

    overview,

    aiUsage,

}) {

    if (!overview) return null;

    const stats = [

        {
            title: "Users",
            value: overview.total_users ?? 0,
            icon: <FiUsers />,
            color: "#10a37f",
        },

        {
            title: "Conversations",
            value: overview.total_conversations ?? 0,
            icon: <FiMessageSquare />,
            color: "#4F8EF7",
        },

        {
            title: "Messages",
            value: overview.total_messages ?? 0,
            icon: <FiActivity />,
            color: "#F59E0B",
        },

        {
            title: "Documents",
            value: overview.total_documents ?? 0,
            icon: <FiFileText />,
            color: "#EF4444",
        },

        {
            title: "Memories",
            value: overview.total_memories ?? 0,
            icon: <FiDatabase />,
            color: "#A855F7",
        },

        {
            title: "AI Requests",
            value: aiUsage?.requests ?? 0,
            icon: <FiCpu />,
            color: "#14B8A6",
        },

    ];

    return (

        <div className="quickstats-grid">

            {

                stats.map((item, index) => (

                    <div
                        key={index}
                        className="quickstat-card"
                    >

                        <div
                            className="quickstat-icon"
                            style={{
                                background: item.color,
                            }}
                        >

                            {item.icon}

                        </div>

                        <div>

                            <div className="quickstat-title">

                                {item.title}

                            </div>

                            <div className="quickstat-value">

                                {item.value}

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default QuickStats;