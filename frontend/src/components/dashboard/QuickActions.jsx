import {
    FiMessageSquare,
    FiUpload,
    FiBarChart2,
    FiDatabase,
    FiUsers,
    FiSettings,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            title: "New Chat",
            icon: <FiMessageSquare />,
            color: "#10a37f",
            action: () => navigate("/chat"),
        },

        {
            title: "Upload Document",
            icon: <FiUpload />,
            color: "#3B82F6",
            action: () => navigate("/documents"),
        },

        {
            title: "Analytics",
            icon: <FiBarChart2 />,
            color: "#F59E0B",
            action: () => navigate("/analytics"),
        },

        {
            title: "Memory",
            icon: <FiDatabase />,
            color: "#8B5CF6",
            action: () => navigate("/memory"),
        },

        {
            title: "Admin",
            icon: <FiUsers />,
            color: "#EF4444",
            action: () => navigate("/admin"),
        },

        {
            title: "Settings",
            icon: <FiSettings />,
            color: "#64748B",
            action: () => navigate("/settings"),
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
                🚀 Quick Actions
            </h2>

            <div

                style={{

                    display:"grid",

                    gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",

                    gap:20,

                }}

            >

                {

                    actions.map(

                        (item,index)=>(

                            <button

                                key={index}

                                onClick={item.action}

                                style={{

                                    background:"#343541",

                                    border:"none",

                                    borderRadius:14,

                                    padding:25,

                                    cursor:"pointer",

                                    transition:"0.25s",

                                    color:"white",

                                }}

                                onMouseEnter={(e)=>{

                                    e.currentTarget.style.transform="translateY(-5px)";
                                    e.currentTarget.style.background="#40414f";

                                }}

                                onMouseLeave={(e)=>{

                                    e.currentTarget.style.transform="translateY(0)";
                                    e.currentTarget.style.background="#343541";

                                }}

                            >

                                <div

                                    style={{

                                        width:60,

                                        height:60,

                                        margin:"auto",

                                        marginBottom:15,

                                        borderRadius:15,

                                        background:item.color,

                                        display:"flex",

                                        alignItems:"center",

                                        justifyContent:"center",

                                        fontSize:28,

                                    }}

                                >

                                    {item.icon}

                                </div>

                                <h3

                                    style={{

                                        margin:0,

                                        fontSize:18,

                                    }}

                                >

                                    {item.title}

                                </h3>

                            </button>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default QuickActions;