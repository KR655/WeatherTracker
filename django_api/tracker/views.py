from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .services import WeatherService
from .models import CityWeather
from .serializers import CityWeatherSerializer
from .services import WeatherService, SearchHistoryService
#views.py

class WeatherView(APIView):

    permission_classes = [AllowAny]

    @extend_schema(
        summary="Get Weather",
        description="Get weather for all cities or a specific city.",
        parameters=[
            OpenApiParameter(
                name="city",
                description="City Name",
                required=False,
                type=str,
            ),
            OpenApiParameter(
                name="condition",
                description="Weather Condition",
                required=False,
                type=str,
            ),
            OpenApiParameter(
                name="min_temp",
                description="Minimum Temperature",
                required=False,
                type=float,
            ),
            OpenApiParameter(
                name="max_temp",
                description="Maximum Temperature",
                required=False,
                type=float,
            ),
            OpenApiParameter(
                name="sort",
                description="Sort by temperature, city_name or last_updated",
                required=False,
                type=str,
            ),
        ],
        responses=CityWeatherSerializer(many=True),
    )
    def get(self, request):

        # Read query parameters
        city = request.GET.get("city","").strip()
        condition = request.GET.get("condition")
        min_temp = request.GET.get("min_temp")
        max_temp = request.GET.get("max_temp")
        sort = request.GET.get("sort")

        # Fetch latest weather if a city is provided

        if city:
            weather = WeatherService.fetch_weather(city)
            
            if weather is None:

                return Response(
                    {
                        "success": False,
                        "message": "City not found."
                    },
                    status=404,
                )

            if request.user.is_authenticated:

                city_obj = CityWeather.objects.get(
                    city_name=weather["city"]
                )

                SearchHistoryService.save_search(
                    request.user,
                    city_obj,
                )

            return Response(
                {
                    "success": True,
                    "count": 1,
                    "data": [weather],
                }
            )
@api_view(["GET"])
def forecast(request):

    city = request.GET.get("city")

    if not city:
        return Response(
            {"error": "City is required"},
            status=400
        )

    data = WeatherService.fetch_forecast(city)

    if data is None:
        return Response(
            {"error": "Unable to fetch forecast"},
            status=404
        )

    return Response(data)