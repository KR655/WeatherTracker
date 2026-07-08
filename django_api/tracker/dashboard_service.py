from .models import CityWeather
from .services import FavoriteService, SearchHistoryService


class DashboardService:

    @staticmethod
    def get_dashboard(user):

        favorites = FavoriteService.get_favorites(user)

        history = SearchHistoryService.get_history(user)

        recent_weather = CityWeather.objects.order_by("-last_updated")[:5]

        return {
            "favorites": favorites,
            "history": history,
            "recent_weather": recent_weather,
        }