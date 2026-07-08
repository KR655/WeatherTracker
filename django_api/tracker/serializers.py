from rest_framework import serializers
from django.contrib.auth.models import User
from .models import WeatherAlert
from .models import (
    CityWeather,
    FavoriteCity,
    SearchHistory,
)


# -----------------------------
# Weather Serializer
# -----------------------------
class CityWeatherSerializer(serializers.ModelSerializer):

    temperature = serializers.SerializerMethodField()

    class Meta:
        model = CityWeather
        fields = [
            "id",
            "city_name",
            "latitude",
            "longitude",
            "temperature",
            "condition",
            "last_updated",
        ]

    def get_temperature(self, obj):
        return f"{obj.temperature}°C"


# -----------------------------
# Register Serializer
# -----------------------------
class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6,
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):

        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )


# -----------------------------
# Favorite Serializer
# -----------------------------
class FavoriteCitySerializer(serializers.ModelSerializer):

    city_name = serializers.CharField(
        source="city.city_name",
        read_only=True,
    )

    temperature = serializers.SerializerMethodField()

    condition = serializers.CharField(
        source="city.condition",
        read_only=True,
    )

    class Meta:
        model = FavoriteCity
        fields = [
            "id",
            "city_name",
            "temperature",
            "condition",
            "created_at",
        ]

    def get_temperature(self, obj):
        return f"{obj.city.temperature}°C"


# -----------------------------
# Search History Serializer
# -----------------------------
class SearchHistorySerializer(serializers.ModelSerializer):

    city_name = serializers.CharField(
        source="city.city_name",
        read_only=True,
    )

    class Meta:
        model = SearchHistory
        fields = [
            "id",
            "city_name",
            "searched_at",
        ]
class WeatherAlertSerializer(serializers.ModelSerializer):

    city_name = serializers.CharField(
        source="city.city_name",
        read_only=True,
    )

    class Meta:

        model = WeatherAlert

        fields = [
            "id",
            "city_name",
            "temperature",
            "condition",
            "is_active",
            "created_at",
        ]
# -----------------------------
# Add Favorite Request
# -----------------------------
class AddFavoriteSerializer(serializers.Serializer):

    city_id = serializers.IntegerField()