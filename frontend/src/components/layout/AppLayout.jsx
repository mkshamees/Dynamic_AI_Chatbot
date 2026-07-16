import { Outlet } from "react-router-dom";

import Navigation from "./Navigation";
import Topbar from "./Topbar";

import "../../styles/main.css";

function AppLayout() {

    return (

        <div className="app-layout">

            {/* ============================= */}
            {/* LEFT NAVIGATION */}
            {/* ============================= */}

            <Navigation />

            {/* ============================= */}
            {/* RIGHT SIDE */}
            {/* ============================= */}

            <div className="app-main">

                {/* Top Bar */}

                <Topbar />

                {/* Current Page */}

                <div className="page-content">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default AppLayout;