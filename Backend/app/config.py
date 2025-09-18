from pydantic import BaseModel
from typing import List

class Settings(BaseModel):
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
    MONGO_DATABASE_URI: str = "mongodb+srv://Ayushman:asdfghjkl@cluster0.yjl1djf.mongodb.net/cluster0?retryWrites=true&w=majority"
    DB_NAME: str = "cluster0"
    
    # CORS Settings
    CORS_ORIGINS: List[str] = ["*"]
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    
    # ML Model Settings
    MODEL_PATH: str = "app/ml_models"
    
    # External APIs
    WEATHER_API_KEY: str = "8f945372fa522a39510cade87c27e8bf"

settings = Settings()