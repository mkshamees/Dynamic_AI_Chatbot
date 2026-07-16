import { FiPlus } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

function SidebarHeader({

    onNewChat,

}) {

    return (

        <div className="sidebar-header">

            <div className="sidebar-logo">

                <div className="logo-circle">

                    <BsStars />

                </div>

                <div>

                    <h2>

                        Dynamic AI

                    </h2>

                    <span>

                        AI Workspace

                    </span>

                </div>

            </div>

            <button

                className="new-chat-btn"

                onClick={onNewChat}

            >

                <FiPlus />

                New Chat

            </button>

        </div>

    );

}

export default SidebarHeader;