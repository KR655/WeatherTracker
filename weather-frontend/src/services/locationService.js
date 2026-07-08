import { getWeather } from "./weatherService";

export function getCurrentLocation(onSuccess, onError) {

    if (!navigator.geolocation) {
        onError("Geolocation is not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        async(position)=>{

            const lat=position.coords.latitude;
            const lon=position.coords.longitude;

            const weather=await getWeather(`${lat},${lon}`);

            onSuccess(weather.data[0]);

        },

        ()=>{

            onError("Unable to fetch location.");

        }

    );

}