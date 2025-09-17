# FasalSaathi Backend

## Overview

FasalSaathi is a comprehensive farming management platform that helps farmers optimize their agricultural operations. This repository contains the backend API implementation built with FastAPI.

## Features

- User Authentication & Authorization
- Farm Management
- Crop Information & Disease Detection
- Weather Data Integration
- Market Price Analysis
- Soil Health Monitoring
- ML-based Crop Recommendations

## Tech Stack

- **Framework:** FastAPI
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Authentication:** JWT
- **ML Libraries:** NumPy, Pillow
- **API Documentation:** Swagger/OpenAPI

## Getting Started

### Prerequisites

- Python 3.8+
- PostgreSQL
- Virtual Environment (recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fasalsaathi-backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Initialize the database:
   ```bash
   alembic upgrade head
   ```

6. Run the application:
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:8000`.

### API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── app/
│   ├── models/       # Database models
│   ├── routers/      # API routes
│   ├── schemas/      # Pydantic models
│   ├── config.py     # Configuration settings
│   ├── database.py   # Database connection
│   ├── dependencies.py # Dependency injection
│   └── main.py       # Application initialization
├── alembic/          # Database migrations
├── tests/            # Unit and integration tests
├── .env.example      # Environment variables template
├── requirements.txt  # Python dependencies
└── run.py           # Application entry point
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/token` - Login and get access token
- `GET /api/v1/auth/me` - Get current user info

### Farms
- `GET /api/v1/farms` - List user's farms
- `POST /api/v1/farms` - Create new farm
- `GET /api/v1/farms/{id}` - Get farm details
- `PUT /api/v1/farms/{id}` - Update farm
- `DELETE /api/v1/farms/{id}` - Delete farm

### Crops
- `GET /api/v1/crops` - List all crops
- `GET /api/v1/crops/{id}` - Get crop details
- `POST /api/v1/crops/disease-detection` - Detect plant diseases
- `POST /api/v1/crops/recommendation` - Get crop recommendations

### Weather
- `GET /api/v1/weather/current/{location}` - Get current weather
- `GET /api/v1/weather/forecast/{location}` - Get weather forecast
- `GET /api/v1/weather/history/{location}` - Get weather history

### Market
- `GET /api/v1/market/prices/current` - Get current market prices
- `GET /api/v1/market/prices/history/{crop_id}` - Get price history
- `GET /api/v1/market/trends/{crop_id}` - Get market trends

## Contributing

1. Create a new branch for your feature
2. Make your changes and write tests
3. Run the test suite
4. Submit a pull request

## License

This project is licensed under the MIT License.