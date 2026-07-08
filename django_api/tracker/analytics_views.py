from collections import Counter

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import (
    FavoriteCity,
    SearchHistory,
    WeatherAlert,
)


class AnalyticsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        history = SearchHistory.objects.filter(user=request.user)
        favorites = FavoriteCity.objects.filter(user=request.user)
        alerts = WeatherAlert.objects.filter(user=request.user)

        cities = [h.city.city_name for h in history]

        counter = Counter(cities)

        most = counter.most_common(5)

        return Response({

            "total_searches": history.count(),

            "favorites": favorites.count(),

            "alerts": alerts.count(),

            "most_searched": most,

        })