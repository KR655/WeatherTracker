import api from "../api/api";

export async function getAnalytics() {

    const response = await api.get("analytics/");

    return response.data;

}