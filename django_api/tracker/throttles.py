from rest_framework.throttling import UserRateThrottle


class WeatherThrottle(UserRateThrottle):

    rate = "60/min"

    def wait(self):
        return super().wait()