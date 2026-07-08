import api from "../api/api";

export async function getFavorites() {
    const response = await api.get("favorites/");
    return response.data;
}

export async function addFavorite(city_name) {
    const response = await api.post("favorites/", {
        city_name,
    });
    console.log("Favorite API Response:", response);
    return response.data;
}

export async function removeFavorite(favorite_id) {
    const response = await api.delete("favorites/", {
        data: {
            favorite_id,
        },
    });
    return response.data;
}