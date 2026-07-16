import {
    FiTrendingUp,
    FiMessageCircle,
    FiFileText,
    FiDatabase,
    FiCpu,
    FiAlertCircle,
} from "react-icons/fi";

function AllInsight({

    overview,

    aiUsage,

    documents,

    memories,

}) {

    if (!overview) return null;

    const insights = [];

    // ----------------------------------
    // Conversation Insight
    // ----------------------------------

    if (overview.total_conversations > 0) {

        insights.push({

            icon: <FiMessageCircle />,

            color: "#10a37f",

            title: "Conversation Activity",

            message: `Users have created ${overview.total_conversations} conversations with ${overview.total_messages} total messages.`,

        });

    }

    // ----------------------------------
    // Document Insight
    // ----------------------------------

    if (documents?.total_documents > 0) {

        insights.push({

            icon: <FiFileText />,

            color: "#F59E0B",

            title: "Knowledge Base",

            message: `${documents.total_documents} documents are available with ${documents.total_chunks} indexed chunks.`

        });

    }

    // ----------------------------------
    // Memory Insight
    // ----------------------------------

    if (memories?.total_memories > 0) {

        insights.push({

            icon: <FiDatabase />,

            color: "#8B5CF6",

            title: "AI Memory",

            message: `The assistant currently stores ${memories.total_memories} long-term memories.`

        });

    }

    // ----------------------------------
    // AI Usage
    // ----------------------------------

    if (aiUsage?.requests > 0) {

        insights.push({

            icon: <FiCpu />,

            color: "#2196F3",

            title: "AI Usage",

            message: `${aiUsage.requests} AI responses generated using ${aiUsage.provider}.`

        });

    }

    // ----------------------------------
    // Growth
    // ----------------------------------

    if (overview.today_messages > 0) {

        insights.push({

            icon: <FiTrendingUp />,

            color: "#00C853",

            title: "Today's Activity",

            message: `${overview.today_messages} new messages have been created today.`

        });

    }

    // ----------------------------------
    // Empty System
    // ----------------------------------

    if (

        overview.total_conversations === 0 &&

        overview.total_documents === 0

    ) {

        insights.push({

            icon: <FiAlertCircle />,

            color: "#EF4444",

            title: "Getting Started",

            message: "Upload documents and begin chatting to unlock analytics."

        });

    }

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

                🧠 AI Insights

            </h2>

            <div

                style={{

                    display:"grid",

                    gap:18,

                }}

            >

                {

                    insights.map(

                        (item,index)=>(

                            <InsightCard

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

function InsightCard({

    icon,

    color,

    title,

    message,

}){

    return(

        <div

            style={{

                display:"flex",

                gap:20,

                alignItems:"center",

                background:"#343541",

                borderRadius:14,

                padding:18,

            }}

        >

            <div

                style={{

                    width:55,

                    height:55,

                    background:color,

                    borderRadius:12,

                    display:"flex",

                    alignItems:"center",

                    justifyContent:"center",

                    color:"white",

                    fontSize:24,

                }}

            >

                {icon}

            </div>

            <div>

                <h3

                    style={{

                        margin:0,

                        color:"white",

                    }}

                >

                    {title}

                </h3>

                <p

                    style={{

                        marginTop:8,

                        color:"#bbb",

                    }}

                >

                    {message}

                </p>

            </div>

        </div>

    );

}

export default AllInsight;