from typing import List, Optional, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import CoreSchema, core_schema
from bson import ObjectId

class PyObjectId(str):
    @classmethod
    def __get_pydantic_core_schema__(
        cls,
        _source_type: Any,
        _handler: Any,
    ) -> CoreSchema:
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.chain_schema([
                    core_schema.str_schema(),
                    core_schema.no_info_plain_validator_function(cls.validate),
                ]),
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x),
                return_schema=core_schema.str_schema(),
            ),
        )

    @classmethod
    def validate(cls, value):
        if isinstance(value, ObjectId):
            return value
        
        if isinstance(value, str):
            try:
                return ObjectId(value)
            except Exception:
                raise ValueError("Invalid ObjectId format")
                
        raise ValueError("Invalid ObjectId")


# Base Schemas
class UserBase(BaseModel):
    email: EmailStr
    phone: str
    full_name: str
    language_preference: str = "en"
    is_active: bool = True
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "user@example.com",
                "phone": "+919876543210",
                "full_name": "John Doe",
                "language_preference": "en",
                "is_active": True
            }
        },
        "from_attributes": True
    }

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

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    token: Optional[Token] = None

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str},
        "arbitrary_types_allowed": True
    }

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
