import api from "../api/api";

export async function getAlerts() {
    const response = await api.get("alerts/");
    return response.data;
}

export async function createAlert(data) {
    const response = await api.post("alerts/", data);
    return response.data;
}
export async function deleteAlert(alert_id) {

    const response = await api.delete("alerts/", {

        data: {
            alert_id,
        },

    });

    return response.data;

}