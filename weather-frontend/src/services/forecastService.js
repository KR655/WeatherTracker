import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const getForecast = async (city) => {
    const response = await axios.get(
        `${API}/forecast/?city=${city}`
    );

    return response.data;
};