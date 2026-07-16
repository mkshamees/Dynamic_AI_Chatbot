import {
    FiLogOut,
    FiSettings,
    FiMoon,
    FiSun,
    FiShield,
    FiUser,
} from "react-icons/fi";

function UserPanel({

    user,

    darkMode,

    setDarkMode,

    onLogout,

}) {

    const isAdmin = user?.role === "admin";

    return (

        <div className="user-panel">

            <div className="user-info">

                <div className="user-avatar">

                    {

                        user?.username

                            ? user.username.charAt(0).toUpperCase()

                            : "..."

                    }

                </div>

                <div>

                    <div className="user-name">

                        {

                            user?.username ||

                            "Loading..."

                        }

                    </div>

                    <div
                        className="user-email"
                        style={{
                            fontSize: "12px",
                            opacity: 0.7,
                            marginTop: 2,
                        }}
                    >

                        {

                            user?.email ||

                            ""

                        }

                    </div>

                    <div
                        className="user-role"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginTop: 4,
                        }}
                    >

                        {

                            isAdmin

                                ?

                                <>

                                    <FiShield />

                                    Administrator

                                </>

                                :

                                <>

                                    <FiUser />

                                    User

                                </>

                        }

                    </div>

                </div>

            </div>

            <div className="user-actions">

                <button

                    title="Toggle Theme"

                    onClick={() =>

                        setDarkMode(

                            !darkMode

                        )

                    }

                >

                    {

                        darkMode

                            ?

                            <FiSun />

                            :

                            <FiMoon />

                    }

                </button>

                <button

                    title="Settings"

                >

                    <FiSettings />

                </button>

                <button

                    title="Logout"

                    onClick={onLogout}

                >

                    <FiLogOut />

                </button>

            </div>

        </div>

    );

}

export default UserPanel;