import {
    Pie
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);

function UsagePieChart({

    documents,
    memories,

}) {

    const data = {

        labels: [

            "Documents",

            "Memories",

        ],

        datasets: [

            {

                data: [

                    documents,

                    memories,

                ],

                backgroundColor: [

                    "#10a37f",

                    "#3b82f6",

                ],

            },

        ],

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

            <h2>Usage Distribution</h2>

            <Pie data={data} />

        </div>

    );

}

export default UsagePieChart;