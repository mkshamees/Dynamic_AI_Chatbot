import "./../../styles/admin.css";

function Card({ title, value, icon, color }) {
    return (
        <div
            className="admin-card"
            style={{
                borderTop: `5px solid ${color}`,
            }}
        >
            <div className="admin-card-icon">
                {icon}
            </div>

            <div className="admin-card-content">
                <h3>{title}</h3>
                <h1>{value}</h1>
            </div>
        </div>
    );
}

export default function DashboardCards({ overview }) {

    if (!overview) return null;

    return (

        <div className="admin-card-grid">

            <Card
                title="Users"
                value={overview.total_users}
                icon="👤"
                color="#10a37f"
            />

            <Card
                title="Conversations"
                value={overview.total_conversations}
                icon="💬"
                color="#4f8cff"
            />

            <Card
                title="Messages"
                value={overview.total_messages}
                icon="📨"
                color="#ff9800"
            />

            <Card
                title="Documents"
                value={overview.total_documents}
                icon="📄"
                color="#8e44ad"
            />

            <Card
                title="Memories"
                value={overview.total_memories}
                icon="🧠"
                color="#f44336"
            />

            <Card
                title="Today's Messages"
                value={overview.today_messages}
                icon="📈"
                color="#00c853"
            />

        </div>

    );

}