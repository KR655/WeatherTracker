from unittest.mock import patch
from django.test import TestCase
from tracker.services import WeatherService

class WeatherServiceTest(TestCase):

    @patch("tracker.services.requests.get")
    def test_weather_fetch(self, mock_get):

        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            "location": {
                "name": "Chennai",
                "country": "India",
                "region": "Tamil Nadu",
                "localtime": "2026-07-08 20:00",
                "lat": 13.08,
                "lon": 80.27
            },
            "current": {
                "temp_c": 30,
                "feelslike_c": 34,
                "humidity": 80,
                "wind_kph": 18,
                "pressure_mb": 1008,
                "uv": 5,
                "condition": {
                    "text": "Sunny",
                    "icon": "//cdn.weatherapi.com/icon.png"
                }
            }
        }

        weather = WeatherService.fetch_weather("Chennai")

        self.assertEqual(weather["city"], "Chennai")