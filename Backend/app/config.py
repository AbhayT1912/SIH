from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Settings(BaseModel):
    # Application Settings
    APP_NAME: str = "FasalSaathi API"
    VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    API_PREFIX: str = os.getenv("API_V1_PREFIX", "/api/v1")
    
    # Security Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "e89f9336e84e47e49369470d5b589d31e008c7a40774c8139929af3f79021a9b")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # Database Settings
    MONGO_USER: str = os.getenv("MONGO_USER", "")
    MONGO_PASSWORD: str = os.getenv("MONGO_PASSWORD", "")
    MONGO_CLUSTER: str = os.getenv("MONGO_CLUSTER", "")
    DB_NAME: str = os.getenv("MONGO_DB_NAME", "")
    
    @property
    def MONGO_DATABASE_URI(self) -> str:
        return f"mongodb+srv://{self.MONGO_USER}:{self.MONGO_PASSWORD}@{self.MONGO_CLUSTER}.mongodb.net/{self.DB_NAME}?retryWrites=true&w=majority"
    
    # CORS Settings
    CORS_ORIGINS: List[str] = ["*"]
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    
    # ML Model Settings
    MODEL_PATH: str = "app/ml_models"
    
    # External APIs
    WEATHER_API_KEY: str = "8f945372fa522a39510cade87c27e8bf"

settings = Settings()