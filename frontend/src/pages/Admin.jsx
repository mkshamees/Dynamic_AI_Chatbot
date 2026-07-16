import { useEffect, useState } from "react";

import AdminLayout from "../components/admin/AdminLayout";

import { getAnalyticsOverview } from "../api/api";

function Admin() {

    const [overview, setOverview] = useState(null);

    useEffect(() => {

        async function load() {

            try {

                const res = await getAnalyticsOverview();

                setOverview(res.data);

            }

            catch (err) {

                console.error(err);

            }

        }

        load();

    }, []);

    return (

        <AdminLayout

            overview={overview}

        />

    );

}

export default Admin;