from pydantic_settings import BaseSettings
from typing import List
import json

class Settings(BaseSettings):
    # Application Settings
    APP_NAME: str = "FasalSaathi API"
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    API_PREFIX: str = "/api/v1"
    
    # Security Settings
    SECRET_KEY: str = "e89f9336e84e47e49369470d5b589d31e008c7a40774c8139929af3f79021a9b"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database Settings
    DATABASE_URL: str = "sqlite:///./data/fasalsaathi.db"
    
    # CORS Settings
    CORS_ORIGINS: List[str] = ["*"]  # Allow all origins
    HOST: str = "127.0.0.1"
    PORT: int = 8088
    
    # ML Model Settings
    MODEL_PATH: str = "app/ml_models"
    
    # External APIs
    WEATHER_API_KEY: str = "8f945372fa522a39510cade87c27e8bf"
    SOIL_API_KEY: str = ""
    
    model_config = {
        "env_file": ".env",
        "case_sensitive": True,
        "env_file_encoding": "utf-8",
        "extra": "allow"
    }

# Create global settings object
settings = Settings()