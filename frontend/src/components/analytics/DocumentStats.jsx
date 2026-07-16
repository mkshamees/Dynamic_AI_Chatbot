function DocumentStats({ data }) {

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

            <h2>📄 Document Analytics</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                    gap: 20,
                    marginTop: 20,
                }}
            >

                <div className="stat-card">
                    <h3>Total Documents</h3>
                    <h1>{data.total_documents}</h1>
                </div>

                <div className="stat-card">
                    <h3>Total Chunks</h3>
                    <h1>{data.total_chunks}</h1>
                </div>

                <div className="stat-card">
                    <h3>Average Chunks</h3>
                    <h1>{data.average_chunks}</h1>
                </div>

            </div>

        </div>

    );

}

export default DocumentStats;