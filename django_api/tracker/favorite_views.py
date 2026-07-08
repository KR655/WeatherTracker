from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from drf_spectacular.utils import extend_schema

from .models import CityWeather
from .serializers import FavoriteCitySerializer
from .services import FavoriteService


class FavoriteView(APIView):

    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Favorites"])
    def get(self, request):

        favorites = FavoriteService.get_favorites(request.user)

        serializer = FavoriteCitySerializer(
            favorites,
            many=True
        )

        return Response(
            {
                "success": True,
                "count": len(serializer.data),
                "data": serializer.data,
            }
        )

    @extend_schema(tags=["Favorites"])
    def post(self, request):

        city_name = request.data.get("city_name")

        if not city_name:
            return Response(
                {
                    "success": False,
                    "message": "city_name is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            city = CityWeather.objects.get(
                city_name__iexact=city_name
            )

        except CityWeather.DoesNotExist:

            return Response(
                {
                    "success": False,
                    "message": "City not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        favorite, created = FavoriteService.add_favorite(
            request.user,
            city
        )

        serializer = FavoriteCitySerializer(favorite)

        return Response(
            {
                "success": True,
                "message": "Favorite added successfully." if created else "Already exists.",
                "data": serializer.data,
            }
        ) 
    @extend_schema(tags=["Favorites"])
    def delete(self, request):
        favorite_id = request.data.get("favorite_id")
        if not favorite_id:
            return Response(
            {
                "success": False,
                "message": "favorite_id is required."
            },
            status=400,
        )
        deleted = FavoriteService.remove_favorite(
            request.user,
            favorite_id,
        )

        if not deleted:

            return Response(
                {
                    "success": False,
                    "message": "Favorite not found."
                },
                status=404,
            )

        return Response(
            {
                "success": True,
                "message": "Favorite removed successfully."
            }
        )