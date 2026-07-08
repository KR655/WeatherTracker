import api from "../api/api";

export async function getWeather(city) {

    const response = await api.get(
        `weather/?city=${city}`
    );

    return response.data;

}