function StatCard({

    title,

    value,

    icon,

    color = "#10a37f",

}) {

    return (

        <div

            style={{

                background: "#202123",

                borderRadius: 14,

                padding: 24,

                color: "#fff",

                flex: 1,

                minWidth: 220,

                borderLeft: `6px solid ${color}`,

                boxShadow: "0 8px 25px rgba(0,0,0,.2)",

            }}

        >

            <div

                style={{

                    fontSize: 14,

                    color: "#999",

                    marginBottom: 12,

                }}

            >

                {icon} {title}

            </div>

            <div

                style={{

                    fontSize: 34,

                    fontWeight: "bold",

                }}

            >

                {value}

            </div>

        </div>

    );

}

export default StatCard;