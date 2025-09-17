import httpx
from datetime import datetime
from app.config import settings

class WeatherService:
    BASE_URL = "https://api.openweathermap.org/data/2.5"
    
    def __init__(self):
        self.api_key = settings.WEATHER_API_KEY
        
    async def get_current_weather(self, lat: float = 22.62, lon: float = 77.76):
        """Get current weather for given coordinates (default: Itarsi, MP)"""
        url = f"{self.BASE_URL}/weather"
        params = {
            "lat": lat,
            "lon": lon,
            "appid": self.api_key,
            "units": "metric"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()
            
    async def get_forecast(self, lat: float = 22.62, lon: float = 77.76, days: int = 7):
        """Get weather forecast for given coordinates"""
        url = f"{self.BASE_URL}/forecast"
        params = {
            "lat": lat,
            "lon": lon,
            "appid": self.api_key,
            "units": "metric"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()

# Create a global instance
weather_service = WeatherService()