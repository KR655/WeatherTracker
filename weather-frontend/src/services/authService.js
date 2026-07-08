import api from "../api/api";

export async function login(username, password) {

    const response = await api.post(
        "login/",
        {
            username,
            password,
        }
    );

    return response.data;

}

export async function register(username, email, password) {

    const response = await api.post(
        "register/",
        {
            username,
            email,
            password,
        }
    );

    return response.data;

}

export async function refresh(refreshToken) {

    const response = await api.post(
        "refresh/",
        {
            refresh: refreshToken,
        }
    );

    return response.data;

}