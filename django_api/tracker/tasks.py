from celery import shared_task
from django.core.mail import send_mail

from .models import WeatherAlert
from .services import WeatherService

import logging

logger = logging.getLogger(__name__)
@shared_task
def check_weather_alerts():

    alerts = WeatherAlert.objects.filter(
        is_active=True
    )

    for alert in alerts:

        weather = WeatherService.fetch_weather(
            alert.city.city_name
        )

        if weather is None:
            continue

        triggered = False

        if alert.temperature:

            if weather["temperature"] >= float(alert.temperature):
                triggered = True

        if alert.condition:

            if weather["condition"].lower() == alert.condition.lower():
                triggered = True

        if triggered:

            send_mail(
                subject="Weather Alert Triggered!",
                message=f"""
Hello {alert.user.username},

Your weather alert has been triggered.

City: {alert.city.city_name}
Temperature: {weather['temperature']}°C
Condition: {weather['condition']}

Regards,
Weather Tracker
""",
                from_email=None,
                recipient_list=[alert.user.email],
                fail_silently=False,
            )

            logger.info(f"Email sent to {alert.user.email}")