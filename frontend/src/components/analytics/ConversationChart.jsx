import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function ConversationChart({ data }) {

    if (!data || data.length === 0) {

        return null;

    }

    return (

        <div
            style={{
                background: "#202123",
                padding: 20,
                borderRadius: 12,
                marginBottom: 30,
            }}
        >

            <h2
                style={{
                    marginBottom: 20,
                }}
            >
                💬 Conversation Trend
            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="conversations"
                        stroke="#10a37f"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ConversationChart;