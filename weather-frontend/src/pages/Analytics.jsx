import { useEffect, useState } from "react";
import { getAnalytics } from "../services/analyticsService";
import Navbar from "../components/Navbar";
function Analytics() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        async function load() {

            const data = await getAnalytics();

            setStats(data);

        }

        load();

    }, []);

    if (!stats) {
        return (
            <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
                <Navbar />
                <div className="flex items-center justify-center h-[80vh]">
                    <h2 className="text-2xl font-semibold">Loading Analytics...</h2>
                </div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-6">

                <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">

                    📊 Analytics

                </h1>

                <div className="grid grid-cols-3 gap-6">

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

                        <h2 className="text-gray-500 dark:text-gray-300">
                            Total Searches
                        </h2>

                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

                            {stats.total_searches}

                        </h1>

                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

                        <h2 className="text-gray-500 dark:text-gray-300">
                            Favorites
                        </h2>

                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

                            {stats.favorites}

                        </h1>

                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">

                        <h2 className="text-gray-500 dark:text-gray-300">Alerts</h2>

                        <h1 className="text-4xl font-bold text-slate-900 dark:text-whitee">

                            {stats.alerts}

                        </h1>

                    </div>

                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow mt-8 p-6 text-black dark:text-white">
                    <h2 className="text-2xl font-bold mb-5">

                        Most Searched Cities

                    </h2>

                    {

                        stats.most_searched.map((city, index) => (

                            <div
                                key={index}
                                className="flex justify-between border-b border-gray-200 dark:border-slate-700 py-3"                            >

                                <span>{city[0]}</span>

                                <span>{city[1]} Searches</span>

                            </div>

                        ))

                    }

                </div>

            </div>
        </div>

    );

}

export default Analytics;