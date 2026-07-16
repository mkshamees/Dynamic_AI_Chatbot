import { useEffect, useState } from "react";

import {
    FiBell,
    FiMoon,
    FiSun,
    FiSearch,
} from "react-icons/fi";

import authService from "../../services/authService";

function Topbar() {

    const [user, setUser] = useState(null);

    const [darkMode, setDarkMode] = useState(false);

    const [today, setToday] = useState("");

    useEffect(() => {

        authService.getUser().then(setUser);

        const updateDate = () => {

            setToday(

                new Date().toLocaleDateString(

                    "en-US",

                    {

                        weekday:"long",

                        year:"numeric",

                        month:"long",

                        day:"numeric",

                    }

                )

            );

        };

        updateDate();

    }, []);

    useEffect(() => {

        document.body.classList.toggle(

            "dark",

            darkMode

        );

    }, [darkMode]);

    return (

        <header className="topbar">

            {/* Left */}

            <div className="topbar-left">

                <div className="search-box">

                    <FiSearch />

                    <input

                        type="text"

                        placeholder="Search..."

                    />

                </div>

            </div>

            {/* Right */}

            <div className="topbar-right">

                <span className="today">

                    {today}

                </span>

                <button

                    className="icon-btn"

                    onClick={()=>

                        setDarkMode(

                            !darkMode

                        )

                    }

                >

                    {

                        darkMode

                        ?

                        <FiSun/>

                        :

                        <FiMoon/>

                    }

                </button>

                <button className="icon-btn">

                    <FiBell/>

                </button>

                <div className="profile">

                    <div className="avatar">

                        {

                            user?.username

                            ?.charAt(0)

                            .toUpperCase()

                            ||

                            "U"

                        }

                    </div>

                    <div>

                        <strong>

                            {user?.username}

                        </strong>

                        <div className="role">

                            {user?.role}

                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Topbar;