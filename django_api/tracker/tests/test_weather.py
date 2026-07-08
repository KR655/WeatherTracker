from django.test import TestCase
from tracker.services import WeatherService


class WeatherServiceTest(TestCase):

    def test_weather_fetch(self):

        weather = WeatherService.fetch_weather("Chennai")

        self.assertIsNotNone(weather)
        self.assertEqual(weather["city"], "Chennai")