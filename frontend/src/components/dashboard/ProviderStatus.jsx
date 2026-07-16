import {
    FiCheckCircle,
    FiAlertCircle,
    FiCpu,
    FiDatabase,
    FiServer,
    FiHardDrive,
} from "react-icons/fi";

function ProviderStatus({

    system,

    aiUsage,

}) {

    if (!system) return null;

    const services = [

        {

            title: "AI Provider",

            value: system.ai_provider,

            icon: <FiCpu />,

            status: "online",

        },

        {

            title: "AI Model",

            value: system.ai_model,

            icon: <FiCpu />,

            status: "online",

        },

        {

            title: "Database",

            value: system.database,

            icon: <FiDatabase />,

            status: "online",

        },

        {

            title: "API Status",

            value: system.status,

            icon: <FiServer />,

            status:

                system.status === "Healthy"

                    ? "online"

                    : "offline",

        },

        {

            title: "Vector Store",

            value: "ChromaDB",

            icon: <FiHardDrive />,

            status: "online",

        },

        {

            title: "AI Requests",

            value: aiUsage?.requests ?? 0,

            icon: <FiCpu />,

            status: "online",

        },

    ];

    return (

        <div

            style={{

                background:"#202123",

                borderRadius:16,

                padding:25,

                marginTop:30,

            }}

        >

            <h2

                style={{

                    marginBottom:25,

                }}

            >

                ⚡ Provider Status

            </h2>

            <div

                style={{

                    display:"grid",

                    gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",

                    gap:20,

                }}

            >

                {

                    services.map(

                        (item,index)=>(

                            <StatusCard

                                key={index}

                                {...item}

                            />

                        )

                    )

                }

            </div>

        </div>

    );

}

function StatusCard({

    title,

    value,

    icon,

    status,

}){

    const online=status==="online";

    return(

        <div

            style={{

                background:"#343541",

                borderRadius:14,

                padding:20,

                display:"flex",

                justifyContent:"space-between",

                alignItems:"center",

            }}

        >

            <div>

                <div

                    style={{

                        color:"#999",

                        marginBottom:8,

                    }}

                >

                    {title}

                </div>

                <div

                    style={{

                        color:"white",

                        fontSize:20,

                        fontWeight:700,

                    }}

                >

                    {value}

                </div>

            </div>

            <div

                style={{

                    display:"flex",

                    flexDirection:"column",

                    alignItems:"center",

                    gap:8,

                }}

            >

                <div

                    style={{

                        fontSize:28,

                        color:"#10a37f",

                    }}

                >

                    {icon}

                </div>

                {

                    online

                    ?

                    <FiCheckCircle

                        color="#00C853"

                        size={20}

                    />

                    :

                    <FiAlertCircle

                        color="#EF4444"

                        size={20}

                    />

                }

            </div>

        </div>

    );

}

export default ProviderStatus;