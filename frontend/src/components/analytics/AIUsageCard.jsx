function AIUsageCard({ data }) {

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

            <h2>🤖 AI Usage</h2>

            <p>
                <strong>Provider:</strong> {data.provider}
            </p>

            <p>
                <strong>Total Requests:</strong> {data.requests}
            </p>

            <p>
                <strong>Estimated Tokens:</strong> {data.estimated_tokens}
            </p>

            <p>
                <strong>Average Response Time:</strong>{" "}
                {data.average_response_time}s
            </p>

        </div>

    );

}

export default AIUsageCard;