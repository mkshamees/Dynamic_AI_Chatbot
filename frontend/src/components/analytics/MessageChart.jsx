import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function MessageChart({ data }) {

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
                📨 Message Trend
            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <AreaChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="messages"
                        stroke="#4CAF50"
                        fill="#10a37f"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

}

export default MessageChart;