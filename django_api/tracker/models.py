from django.db import models
from django.contrib.auth.models import User


class CityWeather(models.Model):
    city_name = models.CharField(max_length=100, unique=True)

    latitude = models.FloatField()

    longitude = models.FloatField()

    temperature = models.DecimalField(
        max_digits=5,
        decimal_places=2,
    )

    condition = models.CharField(
        max_length=100,
    )

    last_updated = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["city_name"]

    def __str__(self):
        return f"{self.city_name} ({self.temperature}°C)"


class FavoriteCity(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="favorites",
    )

    city = models.ForeignKey(
        CityWeather,
        on_delete=models.CASCADE,
        related_name="favorited_by",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:

        unique_together = (
            "user",
            "city",
        )

        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} -> {self.city.city_name}"


class SearchHistory(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="search_history",
    )

    city = models.ForeignKey(
        CityWeather,
        on_delete=models.CASCADE,
    )

    searched_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:

        ordering = [
            "-searched_at"
        ]

    def __str__(self):
        return f"{self.user.username} searched {self.city.city_name}"
class WeatherAlert(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="alerts",
    )

    city = models.ForeignKey(
        CityWeather,
        on_delete=models.CASCADE,
    )

    temperature = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
    )

    condition = models.CharField(
        max_length=50,
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f"{self.user.username} - {self.city.city_name}"