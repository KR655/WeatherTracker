from .models import CityWeather


def apply_filters(request):

    queryset = CityWeather.objects.all()

    city = request.GET.get("city")
    condition = request.GET.get("condition")
    min_temp = request.GET.get("min_temp")
    max_temp = request.GET.get("max_temp")
    sort = request.GET.get("sort")

    if city:
        queryset = queryset.filter(city_name__iexact=city)

    if condition:
        queryset = queryset.filter(condition__icontains=condition)

    if min_temp:
        queryset = queryset.filter(temperature__gte=min_temp)

    if max_temp:
        queryset = queryset.filter(temperature__lte=max_temp)

    if sort:
        queryset = queryset.order_by(sort)

    return queryset