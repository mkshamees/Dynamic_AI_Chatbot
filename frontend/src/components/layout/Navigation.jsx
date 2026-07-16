import { NavLink } from "react-router-dom";

import {
    FiHome,
    FiMessageSquare,
    FiFileText,
    FiBarChart2,
    FiSettings,
    FiShield,
    FiLogOut,
} from "react-icons/fi";

import { useEffect, useState } from "react";

import authService from "../../services/authService";

function Navigation() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        authService.getUser().then(setUser);

    }, []);

    return (

        <aside className="navigation">

            {/* ============================= */}
            {/* Logo */}
            {/* ============================= */}

            <div className="nav-logo">

                🤖 Dynamic AI

            </div>

            {/* ============================= */}
            {/* Menu */}
            {/* ============================= */}

            <nav className="nav-menu">

                <NavLink
                    to="/dashboard"
                    className="nav-item"
                >
                    <FiHome />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/chat"
                    className="nav-item"
                >
                    <FiMessageSquare />
                    <span>Chat</span>
                </NavLink>

                <NavLink
                    to="/analytics"
                    className="nav-item"
                >
                    <FiBarChart2 />
                    <span>Analytics</span>
                </NavLink>

                <NavLink
                    to="/settings"
                    className="nav-item"
                >
                    <FiSettings />
                    <span>Settings</span>
                </NavLink>

                {user?.role === "admin" && (

                    <NavLink
                        to="/admin"
                        className="nav-item"
                    >
                        <FiShield />
                        <span>Admin</span>
                    </NavLink>

                )}

            </nav>

            {/* ============================= */}
            {/* Bottom */}
            {/* ============================= */}

            <button

                className="logout-button"

                onClick={() => authService.logout()}

            >

                <FiLogOut />

                Logout

            </button>

        </aside>

    );

}

export default Navigation;