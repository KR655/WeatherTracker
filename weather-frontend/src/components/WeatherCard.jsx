import { motion } from "framer-motion";
import {
    FaTemperatureHigh,
    FaWind,
    FaTint,
    FaSun,
} from "react-icons/fa";
function WeatherCard({ weather, onFavorite }) {

    if (!weather) return null;

    return (

        <motion.div

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.5 }}

            className="mt-8 rounded-3xl p-8 shadow-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 dark:from-slate-800 dark:via-slate-900 dark:to-black text-white backdrop-blur-lg transition-colors duration-300"            >

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-5xl font-extrabold tracking-wide">

                        {weather.city}

                    </h1>

                    <p className="text-xl opacity-90">

                        {weather.region}, {weather.country}

                    </p>

                </div>

                <img
                    src={weather.icon}
                    alt={weather.condition}
                    className="w-24 h-24"
                />

            </div>

            <div className="mt-6">

                <h2 className="text-7xl font-black">

                    {weather.temperature}°C

                </h2>

                <p className="text-xl mt-2">

                    {weather.condition}

                </p>

                <p className="mt-3 text-lg opacity-90">

                    Feels Like {weather.feels_like}°C

                </p>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

                <div className="bg-white/15 backdrop-blur-md hover:bg-white/25 transition duration-300 rounded-xl p-4">

                    <FaTint className="text-2xl mb-2" />

                    <p>Humidity</p>

                    <h3 className="text-2xl font-bold mt-2">{weather.humidity}%</h3>

                </div>

                <div className="bg-white/15 backdrop-blur-md hover:bg-white/25 transition duration-300 rounded-xl p-4">

                    <FaWind className="text-2xl mb-2" />

                    <p>Wind</p>

                    <h3 className="text-2xl font-bold mt-2">{weather.wind} km/h</h3>

                </div>

                <div className="bg-white/15 backdrop-blur-md hover:bg-white/25 transition duration-300 rounded-xl p-4">

                   <FaTemperatureHigh className="text-2xl mb-2" />

                    <p>Pressure</p>

                    <h3 className="text-2xl font-bold mt-2">{weather.pressure}</h3>

                </div>

                <div className="bg-white/15 backdrop-blur-md hover:bg-white/25 transition duration-300 rounded-xl p-4">

                    <FaSun className="text-2xl mb-2" />

                    <p>UV</p>

                    <h3 className="text-2xl font-bold mt-2">{weather.uv}</h3>

                </div>

            </div>

            <button

                onClick={() => {

                    console.log(weather);

                    onFavorite(weather.city);

                }}

                className="
                mt-8
                bg-yellow-300 dark:bg-yellow-500
                hover:bg-yellow-400
                hover:scale-105
                transition-all
                duration-300
                text-black dark:text-white                
                font-semibold
                px-6
                py-3
                rounded-xl
                shadow-lg
                "
            >

                ⭐ Add to Favorites

            </button>

        </motion.div>

    );

}

export default WeatherCard;