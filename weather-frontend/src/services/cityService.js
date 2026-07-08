import api from "../api/api";

export async function searchCities(query){

    const response=await api.get(
        `cities/?q=${query}`
    );

    return response.data;

}