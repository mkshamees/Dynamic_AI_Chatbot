function DocumentStatsCard({ data }) {

    if (!data) return null;

    return (

        <div
            style={{
                background: "#202123",
                padding: 25,
                borderRadius: 12,
                marginBottom: 30,
            }}
        >

            <h2>

                📚 Documents

            </h2>

            <h1>

                {data.total_documents}

            </h1>

            <p>

                Total Uploaded Documents

            </p>

        </div>

    );

}

export default DocumentStatsCard;