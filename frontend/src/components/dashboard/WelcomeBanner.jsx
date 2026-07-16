import "./dashboard.css";

function WelcomeBanner({ user }) {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    const today = new Date().toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    return (

        <div className="dashboard-banner">

            <div>

                <h1>

                    {greeting},

                    {" "}

                    {user?.username || "User"}

                    👋

                </h1>

                <p>

                    Welcome back to your AI Command Center.

                </p>

            </div>

            <div className="dashboard-date">

                {today}

            </div>

        </div>

    );

}

export default WelcomeBanner;