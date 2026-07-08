from django.urls import path
from .dashboard_views import DashboardView
from .views import WeatherView
from .favorite_views import FavoriteView
from .history_views import SearchHistoryView
from .auth_views import RegisterView, LoginView
from .city_views import CitySearchView
from .alert_views import WeatherAlertView
from .analytics_views import AnalyticsView
from .views import forecast
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    # Weather
    path(
        "weather/",
        WeatherView.as_view(),
        name="weather",
    ),

    # Authentication
    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),

    path(
    "login/",
    LoginView.as_view(),
    name="login",
    ),

    path(
        "refresh/",
        TokenRefreshView.as_view(),
        name="refresh",
    ),

    # Favorites
    path(
        "favorites/",
        FavoriteView.as_view(),
        name="favorites",
    ),
    path(
    "history/",
    SearchHistoryView.as_view(),
    name="history",
    ),
    path(
    "dashboard/",
    DashboardView.as_view(),
    name="dashboard",
    ),
    path(
    "cities/",
    CitySearchView.as_view(),
    name="city-search",),
    path("alerts/", WeatherAlertView.as_view(), name="alerts"),
    path(
    "analytics/",
    AnalyticsView.as_view(),
    name="analytics",),
    path(
    "forecast/",
    forecast,
    name="forecast",
),
]