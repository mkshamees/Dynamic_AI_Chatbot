import StatCard from "./StatCard";

function OverviewCards({ overview }) {

    if (!overview) {

        return null;

    }

    return (

        <div

            style={{

                display: "grid",

                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",

                gap: "20px",

                marginBottom: "30px",

            }}

        >

            <StatCard
                title="Total Users"
                value={overview.total_users}
                icon="👥"
                color="#4CAF50"
            />

            <StatCard
                title="Conversations"
                value={overview.total_conversations}
                icon="💬"
                color="#2196F3"
            />

            <StatCard
                title="Messages"
                value={overview.total_messages}
                icon="📨"
                color="#9C27B0"
            />

            <StatCard
                title="Documents"
                value={overview.total_documents}
                icon="📄"
                color="#FF9800"
            />

            <StatCard
                title="Memories"
                value={overview.total_memories}
                icon="🧠"
                color="#F44336"
            />

            <StatCard
                title="Today's Messages"
                value={overview.today_messages}
                icon="📈"
                color="#10a37f"
            />

        </div>

    );

}

export default OverviewCards;