import { useEffect, useState } from "react";
import { getAlerts, createAlert, deleteAlert } from "../services/alertService";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
function Alerts() {

    const [alerts, setAlerts] = useState([]);
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [condition, setCondition] = useState("");

    const loadAlerts = async () => {
        try {
            const data = await getAlerts();
            setAlerts(data.data);
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        }
    };

    useEffect(() => {
        loadAlerts();
    }, []);
    const removeAlert = async (id) => {
        await deleteAlert(id);
        toast.success("Alert deleted");
        loadAlerts();
    };

    const submit = async () => {

        try {

            await createAlert({
                city_name: city,
                temperature,
                condition,
            });

            setCity("");
            setTemperature("");
            setCondition("");

            loadAlerts();

            toast.success("Weather alert created");

        } catch (err) {

            console.log(err);
            toast.error("Unable to create alert");

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

            <Navbar />


            <div className="max-w-6xl mx-auto px-6 py-6">

                <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">      
                    🔔 Weather Alerts
                </h1>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 text-black dark:text-white">
                    <div className="grid grid-cols-3 gap-4">

                        <input
                            className="border border-gray-300 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-700 text-black dark:text-white" placeholder="City (Example: Chennai)"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <input
                            className="border border-gray-300 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-700 text-black dark:text-white" type="number"
                            placeholder="Temperature °C"
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                        />

                        <select
                            className="border border-gray-300 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-700 text-black dark:text-white" value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                        >
                            <option value="">Any Condition</option>
                            <option value="Sunny">Sunny</option>
                            <option value="Rain">Rain</option>
                            <option value="Cloudy">Cloudy</option>
                            <option value="Snow">Snow</option>
                            <option value="Mist">Mist</option>
                        </select>

                    </div>

                    <button
                        onClick={submit}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                    >
                        Create Alert
                    </button>

                </div>

                <div className="mt-8 space-y-4">

                    {alerts.length === 0 ? (

                        <div className="text-center text-gray-500 dark:text-gray-300">

                            No alerts created yet.

                        </div>

                    ) : (

                        alerts.map((alert) => (

                            <div
                                key={alert.id}
                                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 hover:shadow-xl transition text-black dark:text-white"                            >

                                <h2 className="text-2xl font-bold">

                                    📍 {alert.city_name}

                                </h2>

                                <div className="grid grid-cols-2 gap-5 mt-4">

                                    <div>

                                        <p className="text-gray-500 dark:text-gray-400">

                                            🌡 Temperature

                                        </p>

                                        <h3 className="font-bold text-lg">

                                            {alert.temperature || "-"}

                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-gray-500 dark:text-gray-400">

                                            ☁ Condition

                                        </p>

                                        <h3 className="font-bold text-lg">

                                            {alert.condition || "Any"}

                                        </h3>

                                    </div>
                                    <button

                                        onClick={() => removeAlert(alert.id)}

                                        className="mt-5 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"

                                    >

                                        🗑 Delete Alert

                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>

    );

}

export default Alerts;