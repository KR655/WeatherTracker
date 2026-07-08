import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import FavoriteList from "../components/FavoriteList";
import History from "../components/History";
import DashboardStats from "../components/DashboardStats";
import { Link } from "react-router-dom";
import { getWeather } from "../services/weatherService";
import { getCurrentLocation } from "../services/locationService";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Forecast from "../components/Forecast";
import { getForecast } from "../services/forecastService";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";
import { getHistory } from "../services/historyService";

function Dashboard() {

  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

 const [forecast, setForecast] = useState([]);
  
  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data.data);
  };

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data.data);
  };

  useEffect(() => {
    loadFavorites();
    loadHistory();
  }, []);

  const search = async (city) => {

    try {
      

      console.log("Dashboard received:", city);

      const response = await getWeather(city);

      console.log(response);
      console.log("SEARCH CALLED");
      const data = await getForecast(city);
      setForecast(data);
      
      setWeather(response.data[0]);

      await loadHistory();


    } catch (err) {

      console.log(err);
      toast.error("Unable to add favorite.");
      toast.error("City not found.");

    }

  };
  

  const favorite = async (city) => {

    await addFavorite(city);

    await loadFavorites();
    toast.success("Added to favorites");

  };

  const remove = async (id) => {

    await removeFavorite(id);

    await loadFavorites();

  };

  const currentLocation = () => {

    getCurrentLocation(

      (weather) => {

        setWeather(weather);

      },

      (message) => {

        toast.error(message);

      }

    );

  };

  return (

    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

      <Navbar />


      <div className="max-w-7xl mx-auto px-8 py-8">



        <div className="mb-5">

          <button
    onClick={currentLocation}
    className="
        bg-gradient-to-r
        from-green-500
        to-emerald-600
        text-white
        font-bold
        px-6
        py-3
        rounded-xl
        shadow-lg
        hover:from-green-600
        hover:to-emerald-700
        hover:scale-105
        transition-all
        duration-300
    "
>
    📍 Use Current Location
</button>
        </div>

        <div className="my-8">

          <SearchBar onSearch={search} />

        </div>
        <div className="mb-8">
          <WeatherCard
            weather={weather}
            onFavorite={favorite}
          />
          <Forecast forecast={forecast} />
          </div>
        <DashboardStats favorites={favorites} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          <FavoriteList
            favorites={favorites}
            onRemove={remove}
          />

          <History
            history={history}
          />

        </div>

      </div>

    </div>

  );

}

export default Dashboard;