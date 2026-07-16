import {
    FiMessageSquare,
    FiFileText,
    FiDatabase,
    FiCpu,
} from "react-icons/fi";

function RecentActivity({

    overview,

    documents,

    memories,

    aiUsage,

}) {

    const activities = [];

    // ----------------------------------
    // Today's Messages
    // ----------------------------------

    if (overview?.today_messages > 0) {

        activities.push({

            icon: <FiMessageSquare />,

            color: "#10a37f",

            title: "New Messages",

            description: `${overview.today_messages} messages created today.`,

        });

    }

    // ----------------------------------
    // Documents
    // ----------------------------------

    if (documents?.recent_uploads?.length > 0) {

        documents.recent_uploads.forEach((doc) => {

            activities.push({

                icon: <FiFileText />,

                color: "#3B82F6",

                title: "Document Uploaded",

                description: doc,

            });

        });

    }

    // ----------------------------------
    // Memory
    // ----------------------------------

    if (memories?.total_memories > 0) {

        activities.push({

            icon: <FiDatabase />,

            color: "#8B5CF6",

            title: "Memory Updated",

            description: `${memories.total_memories} memories stored.`,

        });

    }

    // ----------------------------------
    // AI Usage
    // ----------------------------------

    if (aiUsage?.requests > 0) {

        activities.push({

            icon: <FiCpu />,

            color: "#F59E0B",

            title: "AI Response",

            description: `${aiUsage.requests} responses generated.`,

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

                📜 Recent Activity

            </h2>

            {

                activities.length === 0

                ?

                <p style={{color:"#999"}}>

                    No recent activity.

                </p>

                :

                activities.map((item,index)=>(

                    <div

                        key={index}

                        style={{

                            display:"flex",

                            alignItems:"center",

                            gap:18,

                            padding:"16px 0",

                            borderBottom:

                                index===activities.length-1

                                ? "none"

                                : "1px solid #444",

                        }}

                    >

                        <div

                            style={{

                                width:50,

                                height:50,

                                borderRadius:12,

                                background:item.color,

                                display:"flex",

                                alignItems:"center",

                                justifyContent:"center",

                                color:"white",

                                fontSize:22,

                            }}

                        >

                            {item.icon}

                        </div>

                        <div>

                            <div

                                style={{

                                    color:"white",

                                    fontWeight:600,

                                    marginBottom:5,

                                }}

                            >

                                {item.title}

                            </div>

                            <div

                                style={{

                                    color:"#bbb",

                                }}

                            >

                                {item.description}

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default RecentActivity;