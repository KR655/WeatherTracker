import json
import requests
import logging

logger = logging.getLogger(__name__)
from django.conf import settings

from .models import (
    CityWeather,
    FavoriteCity,
    SearchHistory,
)
from .redis_client import redis_client


class WeatherService:

    BASE_URL = "http://api.weatherapi.com/v1/current.json"

    @staticmethod
    def fetch_weather(city_name):

        cache_key = f"weather:{city_name.lower()}"

        # ---------------- Redis Cache ----------------
        cached_data = redis_client.get(cache_key)

        if cached_data:
            logger.info("Returning weather from Redis Cache")            
            return json.loads(cached_data)

            logger.info("Fetching weather from Weather API")
        params = {
            "key": settings.WEATHER_API_KEY,
            "q": city_name,
        }

        response = requests.get(
            WeatherService.BASE_URL,
            params=params,
            timeout=10,
        )

        if response.status_code != 200:
            return None

        data = response.json()

        location = data["location"]
        current = data["current"]

        weather = {
    "city": location["name"],
    "country": location["country"],
    "region": location["region"],
    "localtime": location["localtime"],

    "latitude": location["lat"],
    "longitude": location["lon"],

    "temperature": current["temp_c"],
    "feels_like": current["feelslike_c"],
    "humidity": current["humidity"],
    "wind": current["wind_kph"],
    "pressure": current["pressure_mb"],
    "uv": current["uv"],

    "condition": current["condition"]["text"],
    "icon": "https:" + current["condition"]["icon"],
}

        # Save to database
        CityWeather.objects.update_or_create(
            city_name=weather["city"],
            defaults={
                "latitude": weather["latitude"],
                "longitude": weather["longitude"],
                "temperature": weather["temperature"],
                "condition": weather["condition"],
            },
        )

        # Cache for 5 minutes
        redis_client.setex(
            cache_key,
            300,
            json.dumps(weather),
        )

        return weather
    @staticmethod
    def fetch_forecast(city):

        url = (
            f"http://api.weatherapi.com/v1/forecast.json"
            f"?key={settings.WEATHER_API_KEY}"
            f"&q={city}"
            f"&days=5"
        )

        response = requests.get(url)

        if response.status_code != 200:
            return None

        data = response.json()

        forecast = []

        for day in data["forecast"]["forecastday"]:

            forecast.append({
                "date": day["date"],
                "max_temp": day["day"]["maxtemp_c"],
                "min_temp": day["day"]["mintemp_c"],
                "condition": day["day"]["condition"]["text"],
                "icon": "https:" + day["day"]["condition"]["icon"],
            })

        return forecast


class FavoriteService:

    @staticmethod
    def add_favorite(user, city):

        favorite, created = FavoriteCity.objects.get_or_create(
            user=user,
            city=city,
        )

        return favorite, created

    @staticmethod
    def get_favorites(user):

        return FavoriteCity.objects.filter(
            user=user
        )

    @staticmethod
    def remove_favorite(user, favorite_id):

        try:

            favorite = FavoriteCity.objects.get(
                id=favorite_id,
                user=user,
            )

            favorite.delete()

            return True

        except FavoriteCity.DoesNotExist:

            return False

class SearchHistoryService:

    @staticmethod
    def save_search(user, city):

        return SearchHistory.objects.create(
            user=user,
            city=city,
        )

    @staticmethod
    def get_history(user):

        return SearchHistory.objects.filter(
            user=user
        )