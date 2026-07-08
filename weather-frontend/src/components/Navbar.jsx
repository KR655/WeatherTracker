import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode, setDarkMode } = useTheme();
    const { logout } = useAuth();
    const handleLogout = () =>  {

        logout();

        navigate("/");

    };

    const active = (path) =>
        location.pathname === path
            ? "bg-blue-900"
            : "hover:bg-blue-600";

    return (

        <nav className="bg-blue-700 dark:bg-slate-900 text-white shadow-lg transition-colors duration-300">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

                <h1 className="text-3xl font-bold">
                    🌤 Weather Tracker
                </h1>

                <div className="flex items-center gap-3">

                    <Link
                        to="/dashboard"
                        className={`px-4 py-2 rounded-lg ${active("/dashboard")}`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/analytics"
                        className={`px-4 py-2 rounded-lg ${active("/analytics")}`}
                    >
                        Analytics
                    </Link>

                    <Link
                        to="/alerts"
                        className={`px-4 py-2 rounded-lg ${active("/alerts")}`}
                    >
                        Alerts
                    </Link>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="mr-4 text-xl"
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    <button

                        onClick={handleLogout}

                        className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold"

                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;