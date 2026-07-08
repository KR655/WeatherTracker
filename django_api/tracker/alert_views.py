from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import CityWeather, WeatherAlert
from .serializers import WeatherAlertSerializer


class WeatherAlertView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        alerts = WeatherAlert.objects.filter(user=request.user)

        serializer = WeatherAlertSerializer(alerts, many=True)

        return Response({
            "success": True,
            "data": serializer.data,
        })

    def post(self, request):

        city_name = request.data.get("city_name")
        temperature = request.data.get("temperature")
        condition = request.data.get("condition")

        city = CityWeather.objects.get(city_name__iexact=city_name)

        alert = WeatherAlert.objects.create(
            user=request.user,
            city=city,
            temperature=temperature,
            condition=condition,
        )

        serializer = WeatherAlertSerializer(alert)

        return Response({
            "success": True,
            "data": serializer.data,
        })
    from rest_framework import status

    def delete(self, request):

        alert_id = request.data.get("alert_id")

        if not alert_id:
            return Response(
                {
                    "success": False,
                    "message": "alert_id is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            alert = WeatherAlert.objects.get(
                id=alert_id,
                user=request.user,
            )

            alert.delete()

            return Response(
                {
                    "success": True,
                    "message": "Alert deleted."
                }
            )

        except WeatherAlert.DoesNotExist:

            return Response(
                {
                    "success": False,
                    "message": "Alert not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )