import {
    Bar
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
);

function ActivityBarChart({ data }) {

    if (!data || data.length === 0) {

        return null;

    }

    const chartData = {

        labels: data.map(item => item.date),

        datasets: [

            {

                label: "Conversations",

                data: data.map(item => item.conversations),

                backgroundColor: "#10a37f",

                borderRadius: 8,

            },

        ],

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                display: false,

            },

        },

        scales: {

            y: {

                beginAtZero: true,

            },

        },

    };

    return (

        <div
            style={{
                background: "#202123",
                padding: 25,
                borderRadius: 12,
                marginTop: 30,
            }}
        >

            <h2>📈 Daily Conversations</h2>

            <Bar
                data={chartData}
                options={options}
            />

        </div>

    );

}

export default ActivityBarChart;