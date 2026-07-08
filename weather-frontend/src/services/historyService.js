import api from "../api/api";

export async function getHistory(){

const response=await api.get("history/");

return response.data;

}