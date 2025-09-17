from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Annotated, Dict, Any
from datetime import datetime, timedelta

from app.database import get_db
from app.dependencies import get_current_active_user
from app.models.models import User, WeatherData
from app.schemas.schemas import WeatherDataCreate, WeatherData as WeatherDataSchema
from app.services.weather_service import weather_service

router = APIRouter(prefix="/weather", tags=["weather"])

@router.get("/current", response_model=Dict[str, Any])
async def get_current_weather(
    current_user: Annotated[User, Depends(get_current_active_user)],
    lat: float = 22.62,
    lon: float = 77.76
):
    """Get current weather data for coordinates (default: Itarsi, MP)"""
    try:
        weather_data = await weather_service.get_current_weather(lat, lon)
        return weather_data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/forecast", response_model=Dict[str, Any])
async def get_weather_forecast(
    current_user: Annotated[User, Depends(get_current_active_user)],
    lat: float = 22.62,
    lon: float = 77.76,
    days: int = 7
):
    """Get weather forecast for coordinates (default: Itarsi, MP)"""
    try:
        forecast_data = await weather_service.get_forecast(lat, lon, days)
        return forecast_data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/history/{location}", response_model=List[WeatherDataSchema])
async def get_weather_history(
    location: str,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    days: int = 30
):
    """Get historical weather data for a location."""
    history = db.query(WeatherData)\
        .filter(
            WeatherData.location == location,
            WeatherData.date >= datetime.utcnow() - timedelta(days=days),
            WeatherData.date <= datetime.utcnow()
        )\
        .order_by(WeatherData.date.desc())\
        .all()
    
    return history

# Admin endpoints for managing weather data
@router.post("/", response_model=WeatherDataSchema)
async def create_weather_data(
    weather: WeatherDataCreate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Create new weather data entry (admin only)."""
    # TODO: Add admin check
    db_weather = WeatherData(**weather.model_dump())
    db.add(db_weather)
    db.commit()
    db.refresh(db_weather)
    return db_weather