from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import (
    FavoriteCitySerializer,
    SearchHistorySerializer,
    CityWeatherSerializer,
)

from .dashboard_service import DashboardService


class DashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        dashboard = DashboardService.get_dashboard(
            request.user
        )

        return Response({

            "success": True,

            "user": {
                "username": request.user.username,
                "email": request.user.email,
            },

            "favorites": FavoriteCitySerializer(
                dashboard["favorites"],
                many=True,
            ).data,

            "history": SearchHistorySerializer(
                dashboard["history"],
                many=True,
            ).data,

            "recent_weather": CityWeatherSerializer(
                dashboard["recent_weather"],
                many=True,
            ).data,

        })