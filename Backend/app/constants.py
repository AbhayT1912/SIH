from typing import Dict, Any

# ML Model Settings
MODEL_PATHS: Dict[str, str] = {
    "yield_prediction": "models/yield_prediction.pkl",
    "crop_recommendation": "models/crop_recommendation.pkl",
    "disease_detection": "models/disease_detection.h5"
}

# Weather API Settings
WEATHER_API_CONFIG: Dict[str, Any] = {
    "base_url": "https://api.weatherapi.com/v1",
    "endpoints": {
        "current": "/current.json",
        "forecast": "/forecast.json"
    }
}

# Market Data Settings
MARKET_PRICE_UPDATE_INTERVAL: int = 3600  # seconds
MARKET_DATA_SOURCES: Dict[str, str] = {
    "local": "local_market_api",
    "national": "agmarknet_api"
}

# Soil Analysis Settings
SOIL_HEALTH_THRESHOLDS: Dict[str, Dict[str, float]] = {
    "ph": {"min": 5.5, "max": 7.5, "optimal": 6.5},
    "nitrogen": {"min": 140, "max": 280, "optimal": 210},
    "phosphorus": {"min": 7, "max": 14, "optimal": 10.5},
    "potassium": {"min": 120, "max": 240, "optimal": 180},
    "organic_matter": {"min": 0.8, "max": 3.0, "optimal": 2.0}
}

# Crop Growth Stages (Generic)
CROP_GROWTH_STAGES: Dict[str, Dict[str, Any]] = {
    "germination": {
        "name": "Germination",
        "name_hindi": "अंकुरण",
        "duration": "7-10 days",
        "critical_factors": ["soil_moisture", "temperature"]
    },
    "vegetative": {
        "name": "Vegetative Growth",
        "name_hindi": "वानस्पतिक वृद्धि",
        "duration": "25-30 days",
        "critical_factors": ["nutrients", "water", "sunlight"]
    },
    "flowering": {
        "name": "Flowering",
        "name_hindi": "फूल आना",
        "duration": "15-20 days",
        "critical_factors": ["temperature", "humidity"]
    },
    "fruiting": {
        "name": "Fruiting",
        "name_hindi": "फल लगना",
        "duration": "25-30 days",
        "critical_factors": ["water", "nutrients"]
    },
    "maturity": {
        "name": "Maturity",
        "name_hindi": "परिपक्वता",
        "duration": "15-20 days",
        "critical_factors": ["dry_weather"]
    }
}

# Error Messages (Multilingual)
ERROR_MESSAGES: Dict[str, Dict[str, str]] = {
    "auth": {
        "invalid_credentials": {
            "en": "Invalid email or password",
            "hi": "अमान्य ईमेल या पासवर्ड"
        },
        "account_disabled": {
            "en": "Account is disabled",
            "hi": "खाता निष्क्रिय है"
        }
    },
    "farm": {
        "not_found": {
            "en": "Farm not found",
            "hi": "खेत नहीं मिला"
        },
        "unauthorized": {
            "en": "Not authorized to access this farm",
            "hi": "इस खेत तक पहुंचने का अधिकार नहीं है"
        }
    }
}