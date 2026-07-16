import {
    FiGrid,
    FiUsers,
    FiMessageSquare,
    FiFileText,
    FiDatabase,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";

import authService from "../../services/authService";

function AdminSidebar() {

    const menu = [

        {
            icon: <FiGrid />,
            label: "Dashboard",
        },

        {
            icon: <FiUsers />,
            label: "Users",
        },

        {
            icon: <FiMessageSquare />,
            label: "Conversations",
        },

        {
            icon: <FiFileText />,
            label: "Documents",
        },

        {
            icon: <FiDatabase />,
            label: "Memory",
        },

        {
            icon: <FiSettings />,
            label: "Settings",
        },

    ];

    return (

        <aside className="admin-sidebar">

            {/* =============================== */}

            {/* Logo */}

            {/* =============================== */}

            <div className="admin-logo">

                🤖 Dynamic AI

                <span>

                    Admin

                </span>

            </div>

            {/* =============================== */}

            {/* Menu */}

            {/* =============================== */}

            <nav className="admin-menu">

                {

                    menu.map((item, index) => (

                        <button

                            key={index}

                            className="admin-menu-item"

                        >

                            {item.icon}

                            <span>

                                {item.label}

                            </span>

                        </button>

                    ))

                }

            </nav>

            {/* =============================== */}

            {/* Bottom */}

            {/* =============================== */}

            <div className="admin-bottom">

                <button

                    className="logout-btn"

                    onClick={authService.logout}

                >

                    <FiLogOut />

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default AdminSidebar;