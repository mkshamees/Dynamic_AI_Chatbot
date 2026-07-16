import { useEffect, useState } from "react";

import { fetchAnalytics } from "../services/analyticsService";

export default function useAnalytics() {

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [data, setData] = useState({});

    useEffect(() => {

        async function load() {

            try {

                const analytics = await fetchAnalytics();

                setData(analytics);

            }

            catch (err) {

                setError(err);

            }

            finally {

                setLoading(false);

            }

        }

        load();

    }, []);

    return {

        ...data,

        loading,

        error,

    };

}