function MemoryStats({ data }) {

    if (!data) return null;

    return (

        <div
            style={{
                background: "#202123",
                padding: 25,
                borderRadius: 12,
                marginTop: 30,
            }}
        >

            <h2>🧠 Memory Analytics</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                    gap: 20,
                    marginTop: 20,
                }}
            >

                <div className="stat-card">
                    <h3>Total Memories</h3>
                    <h1>{data.total_memories}</h1>
                </div>

                <div className="stat-card">
                    <h3>Unique Users</h3>
                    <h1>{data.total_users}</h1>
                </div>

            </div>

        </div>

    );

}

export default MemoryStats;