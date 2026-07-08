import { useState, useEffect } from "react";
import { searchCities } from "../services/cityService";
import toast from "react-hot-toast";
function SearchBar({ onSearch }) {

    const [query, setQuery] = useState("");
    const [cities, setCities] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    useEffect(() => {

        const loadCities = async () => {

            if (query.length < 2) {
                setCities([]);
                return;
            }

            try {

                const data = await searchCities(query);

                setCities(data);

            } catch {

                setCities([]);

            }

        };

        const timer = setTimeout(loadCities, 300);

        return () => clearTimeout(timer);

    }, [query]);

    return (

        <div className="relative">

            <div className="flex gap-3">

                <input

                    className="bg-white dark:bg-slate-800 dark:text-white flex-1 border border-gray-300 rounded-xl p-4 text-lg shadow-sm focus:ring-4 focus:ring-blue-300 outline-none transition"

                    placeholder="Search city..."

                    value={query}

                    onChange={(e) => {

                        setQuery(e.target.value);

                        setShowSuggestions(true);

                    }}

                />

                <button

                    onClick={() => {
                        if (!query.trim()) {
                            toast.error("Please enter a city name");
                            return;
                        }

                        setShowSuggestions(false);
                        onSearch(query);
                    }}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-semibold transition shadow-lg"

                >

                    Search

                </button>

            </div>

            {showSuggestions && cities.length > 0 && (

                <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border max-h-60 overflow-y-auto z-50">

                    {cities.map((city, index) => (

                        <div

                            key={index}

                            onClick={() => {

                                setQuery(city.name);

                                setCities([]);
                                setShowSuggestions(false);
                                onSearch(city.name);

                            }}

                            className="p-3 hover:bg-gray-100 cursor-pointer"

                        >

                            <strong>{city.name}</strong>

                            <div className="text-sm text-gray-500">

                                {city.region}, {city.country}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default SearchBar;