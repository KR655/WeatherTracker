# 🌦️ Weather Tracker

A production-ready Weather Tracking application built using Django REST Framework, React, PostgreSQL, Redis, Celery, and Docker.

---

## Features

- User Authentication (JWT)
- Live Weather Search
- 5-Day Weather Forecast
- Favorite Cities
- Search History
- Weather Alerts
- Email Notifications
- Analytics Dashboard
- Redis Caching
- Celery Background Tasks
- Dockerized Deployment
- Rate Limiting
- Logging
- JWT Blacklisting

---

## Tech Stack

### Backend
- Django
- Django REST Framework
- PostgreSQL
- Redis
- Celery
- Celery Beat
- JWT Authentication

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

### DevOps
- Docker
- Docker Compose
- GitHub Actions (CI)

---

## Project Structure

```text
WeatherTracker
├── django_api
├── weather-frontend
├── docker-compose.yml
├── .github
└── README.md
```

---

## Running the Project

```bash
docker compose up --build
```

Backend:

```
http://localhost:8000
```

Frontend:

```
http://localhost:5173
```

Swagger:

```
http://localhost:8000/swagger/
```

---

## Future Enhancements

- Deployment to Render
- Deployment to Vercel
- Push Notifications
- SMS Alerts
- AI Weather Insights

---

## Author

**Koushik Reddy**

Software Engineer | Python | Django | React | Docker | Redis | PostgreSQL | Celery