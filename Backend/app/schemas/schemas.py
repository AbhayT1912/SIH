from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, values):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")


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
    crop_id: str

class SoilTestCreate(SoilTestBase):
    farm_id: str

class WeatherDataCreate(WeatherDataBase):
    pass

class MarketPriceCreate(MarketPriceBase):
    crop_id: str

# Response Schemas
class User(UserBase):
    id: PyObjectId = Field(alias="_id")
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }

class Farm(FarmBase):
    id: PyObjectId = Field(alias="_id")
    owner_id: str
    created_at: datetime
    updated_at: datetime

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }

class Crop(CropBase):
    id: PyObjectId = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }

class Disease(DiseaseBase):
    id: PyObjectId = Field(alias="_id")
    crop_id: str
    created_at: datetime
    updated_at: datetime

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }

class SoilTest(SoilTestBase):
    id: PyObjectId = Field(alias="_id")
    farm_id: str
    created_at: datetime
    updated_at: datetime

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }

class WeatherData(WeatherDataBase):
    id: PyObjectId = Field(alias="_id")
    created_at: datetime

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }

class MarketPrice(MarketPriceBase):
    id: PyObjectId = Field(alias="_id")
    crop_id: str
    created_at: datetime

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None

# Extended Response Schemas with Relationships
class FarmWithCrops(Farm):
    crops: List[Crop]

class CropWithDiseases(Crop):
    diseases: List[Disease]

class FarmWithSoilTests(Farm):
    soil_tests: List[SoilTest]

class UserWithFarms(User):
    farms: List[Farm]
