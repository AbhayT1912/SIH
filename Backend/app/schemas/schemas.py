from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

# Base Schemas
class UserBase(BaseModel):
    email: EmailStr
    phone: str
    full_name: str
    language_preference: str = "en"

class FarmBase(BaseModel):
    name: str
    location: str
    area: float
    soil_type: str
    irrigation_type: str

class CropBase(BaseModel):
    name: str
    name_hindi: str
    scientific_name: str
    season: str
    duration: int
    water_requirement: float

class DiseaseBase(BaseModel):
    name: str
    name_hindi: str
    symptoms: str
    prevention: str
    treatment: str

class SoilTestBase(BaseModel):
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    organic_matter: float
    test_date: datetime

class WeatherDataBase(BaseModel):
    location: str
    temperature: float
    humidity: float
    rainfall: float
    wind_speed: float
    date: datetime

class MarketPriceBase(BaseModel):
    market_name: str
    price: float
    date: datetime

# Create Schemas
class UserCreate(UserBase):
    password: str

class FarmCreate(FarmBase):
    pass

class CropCreate(CropBase):
    pass

class DiseaseCreate(DiseaseBase):
    crop_id: int

class SoilTestCreate(SoilTestBase):
    farm_id: int

class WeatherDataCreate(WeatherDataBase):
    pass

class MarketPriceCreate(MarketPriceBase):
    crop_id: int

# Response Schemas
class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Farm(FarmBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Crop(CropBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Disease(DiseaseBase):
    id: int
    crop_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class SoilTest(SoilTestBase):
    id: int
    farm_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class WeatherData(WeatherDataBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class MarketPrice(MarketPriceBase):
    id: int
    crop_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None

# Extended Response Schemas with Relationships
class FarmWithCrops(Farm):
    crops: List[Crop]

class CropWithDiseases(Crop):
    diseases: List[Disease]

class FarmWithSoilTests(Farm):
    soil_tests: List[SoilTest]

class UserWithFarms(User):
    farms: List[Farm]