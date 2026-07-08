import { motion } from "framer-motion";

function Forecast({ forecast }) {

    if (!forecast || forecast.length === 0)
        return null;

    return (

        <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-5"

        >

            {forecast.map((day, index) => (

                <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 text-center transition"
                >

                    <h3 className="font-bold">

                        {day.date}

                    </h3>

                    <img
                        src={day.icon}
                        className="mx-auto w-14"
                    />

                    <p className="mt-2">

                        {day.condition}

                    </p>

                    <h2 className="font-bold mt-3">

                        {day.max_temp}° / {day.min_temp}°

                    </h2>

                </div>

            ))}

        </motion.div>

    );

}

export default Forecast;