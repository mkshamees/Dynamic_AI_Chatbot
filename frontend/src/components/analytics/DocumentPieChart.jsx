import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#10a37f",
    "#4CAF50",
    "#2196F3",
    "#FF9800",
    "#9C27B0",
];

function DocumentPieChart({ data }) {

    if (!data) return null;

    const chartData = [

        {
            name: "PDF",
            value: data.pdf_files,
        },

        {
            name: "DOCX",
            value: data.docx_files,
        },

        {
            name: "TXT",
            value: data.txt_files,
        },

        {
            name: "CSV",
            value: data.csv_files,
        },

        {
            name: "XLSX",
            value: data.xlsx_files,
        },

    ];

    return (

        <div
            style={{
                background: "#202123",
                padding: 20,
                borderRadius: 12,
                marginBottom: 30,
            }}
        >

            <h2>📄 File Type Distribution</h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label
                    >

                        {chartData.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={
                                    COLORS[
                                        index % COLORS.length
                                    ]
                                }
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default DocumentPieChart;