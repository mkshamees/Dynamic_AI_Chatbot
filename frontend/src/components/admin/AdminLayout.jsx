import AdminSidebar from "./AdminSidebar";

import AdminHeader from "./AdminHeader";

import DashboardCards from "./DashboardCards";

function AdminLayout({

    overview,

}) {

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <DashboardCards

                    overview={overview}

                />

            </div>

        </div>

    );

}

export default AdminLayout;