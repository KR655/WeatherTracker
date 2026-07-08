function DashboardStats({ favorites }) {

    return (

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 transition-colors duration-300">
                <h2 className="text-gray-500 dark:text-gray-300 text-sm">Favorites</h2>
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    {favorites.length}
                </h1>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 transition-colors duration-300">
                <h2 className="text-gray-500 dark:text-gray-300 text-sm">Weather App</h2>
                <h1 className="text-3xl font-bold text-black dark:text-white">
                    Live
                </h1>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 transition-colors duration-300">
                <h2 className="text-gray-500 dark:text-gray-300 text-sm">Redis Cache</h2>
                <h1 className="text-3xl font-bold text-green-600">
                    Active
                </h1>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 transition-colors duration-300">
                <h2 className="text-gray-500 dark:text-gray-300 text-sm">Backend</h2>
                <h1 className="text-3xl font-bold text-blue-600">
                    Django
                </h1>
            </div>

        </div>

    );

}

export default DashboardStats;