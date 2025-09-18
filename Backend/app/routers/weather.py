from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Annotated, Dict, Any
from datetime import datetime, timedelta

from ..dependencies import get_db, get_current_active_user
from ..schemas.schemas import WeatherDataCreate, WeatherDataBase as WeatherDataSchema, UserBase as UserSchema
from ..services.weather_service import weather_service
from .. import crud

router = APIRouter(tags=["Weather"])

@router.get("/current", response_model=Dict[str, Any])
async def get_current_weather(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
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
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
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
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db),
    days: int = 30
):
    """Get historical weather data for a location."""
    history = await crud.get_weather_history(db, location=location, days=days)
    return history

# Admin endpoints for managing weather data
@router.post("/", response_model=WeatherDataSchema)
async def create_weather_data(
    weather: WeatherDataCreate,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Create new weather data entry (admin only)."""
    # TODO: Add admin check
    return await crud.create_weather_data(db, weather=weather)
