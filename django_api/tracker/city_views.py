import requests

from django.conf import settings

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


class CitySearchView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        query = request.GET.get("q", "").strip()

        if len(query) < 2:
            return Response([])

        response = requests.get(
            "http://api.weatherapi.com/v1/search.json",
            params={
                "key": settings.WEATHER_API_KEY,
                "q": query,
            },
            timeout=10,
        )

        if response.status_code != 200:
            return Response([])

        cities = []

        for item in response.json():

            cities.append({
                "name": item["name"],
                "region": item["region"],
                "country": item["country"],
            })

        return Response(cities)