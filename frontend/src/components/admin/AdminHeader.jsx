import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";

import authService from "../../services/authService";

function AdminHeader() {

    const [user, setUser] = useState(null);

    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {

        authService.getUser().then(setUser);

        const updateDate = () => {

            const now = new Date();

            setCurrentDate(

                now.toLocaleString("en-US", {

                    weekday: "long",

                    year: "numeric",

                    month: "long",

                    day: "numeric",

                    hour: "2-digit",

                    minute: "2-digit",

                })

            );

        };

        updateDate();

        const timer = setInterval(updateDate, 60000);

        return () => clearInterval(timer);

    }, []);

    return (

        <header className="admin-header">

            <div>

                <h2>

                    Welcome back,

                    {" "}

                    {user?.username || "Administrator"}

                    👋

                </h2>

                <p>

                    {currentDate}

                </p>

            </div>

            <div className="admin-header-right">

                <button className="notification-btn">

                    <FiBell />

                </button>

                <div className="admin-avatar">

                    {

                        user?.username

                            ?.charAt(0)

                            .toUpperCase()

                            || "A"

                    }

                </div>

            </div>

        </header>

    );

}

export default AdminHeader;