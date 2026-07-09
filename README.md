# 🌦️ Weather Tracker

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![Django](https://img.shields.io/badge/Django-6.0-092E20?logo=django)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?logo=redis)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions)

A production-ready **Full Stack Weather Tracking Application** built with **React**, **Django REST Framework**, **PostgreSQL**, **Redis**, **Docker**, and **GitHub Actions**. The application provides real-time weather information, forecasts, weather alerts, analytics, authentication, and caching while following modern software engineering practices.

---

# 🌍 Live Demo

### Frontend

https://weather-tracker-just4me.vercel.app

### Backend API

https://weathertracker-backend.onrender.com

### API Documentation

https://weathertracker-backend.onrender.com/swagger/

---

# ✨ Features

- 🔐 JWT Authentication
- 🌦️ Live Weather Search
- 📅 5-Day Weather Forecast
- ⭐ Favorite Cities
- 🕘 Search History
- 🚨 Weather Alerts
- 📧 Email Notifications
- 📊 Analytics Dashboard
- ⚡ Redis Caching
- 🔄 Celery Background Tasks
- 🐳 Dockerized Backend & Frontend
- 🚀 GitHub Actions CI/CD
- 📝 Request Logging
- 🛡️ Rate Limiting
- 🔄 Refresh Token Authentication
- 🌙 Dark Mode
- 📱 Responsive User Interface

---

# 🛠 Technology Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React, Vite, Tailwind CSS, Axios, React Router |
| Backend | Django, Django REST Framework |
| Database | PostgreSQL (Neon) |
| Cache | Redis |
| Background Tasks | Celery, Celery Beat |
| Authentication | JWT (Simple JWT) |
| API | WeatherAPI |
| Deployment | Render, Vercel |
| Containerization | Docker |
| CI/CD | GitHub Actions |

---

# 🏗 System Architecture

```text
                     User
                       │
                       ▼
        React Frontend (Vercel)
                       │
               Axios REST API
                       │
                       ▼
      Django REST Framework (Render)
              │                 │
              │                 │
              ▼                 ▼
      PostgreSQL (Neon)     Redis Cache
              │
              ▼
         WeatherAPI
```

---

# 📁 Project Structure

```text
WeatherTracker
│
├── django_api
│   ├── core
│   ├── tracker
│   ├── Dockerfile
│   ├── requirements.txt
│   └── manage.py
│
├── weather-frontend
│   ├── src
│   ├── public
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── .github
│   └── workflows
│       └── weather-ci.yml
│
├── docker-compose.yml
│
└── README.md
```

---

# ✅ Implemented Features

| Feature | Status |
|---------|--------|
| JWT Authentication | ✅ |
| User Registration | ✅ |
| User Login | ✅ |
| Weather Search | ✅ |
| 5-Day Forecast | ✅ |
| Favorites | ✅ |
| Weather Alerts | ✅ |
| Search History | ✅ |
| Analytics Dashboard | ✅ |
| Email Notifications | ✅ |
| Redis Cache | ✅ |
| Celery Background Tasks | ✅ |
| Docker | ✅ |
| CI/CD Pipeline | ✅ |
| Production Deployment | ✅ |

---

# 🚀 Running Locally

Clone the repository

```bash
https://github.com/KR655/WeatherTracker.git
```

Move into the project

```bash
cd WeatherTracker
```

Start the application

```bash
docker compose up --build
```

---

# 🌐 Local URLs

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/swagger/
```

---

# 🔄 CI/CD

The project uses **GitHub Actions** to automatically:

- Install backend dependencies
- Install frontend dependencies
- Run Django system checks
- Execute database migrations
- Run backend tests
- Build the React application

Every push to the **main** branch automatically triggers the CI pipeline.

---

# 📌 Future Enhancements

- Push Notifications
- SMS Alerts
- AI Weather Insights
- Weather Maps
- PWA Support
- Location Detection
- Weather Charts

---

# 👨‍💻 Author

**Koushik Reddy**

Software Engineer

Python • Django • React • PostgreSQL • Redis • Docker • CI/CD
