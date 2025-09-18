# schemas.py
from pydantic import BaseModel

from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")

class UserCreate(BaseModel):
    full_name: str = Field(..., min_length=2)
    email: EmailStr
    phone: str = Field(..., min_length=10)
    password: str = Field(..., min_length=6)
    language_preference: str = "hi"
    location: Optional[str] = None
    farm_size: Optional[str] = None
    primary_crop: Optional[str] = None

class User(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    full_name: str
    email: str
    phone: str
    language_preference: str
    location: Optional[str] = None
    farm_size: Optional[str] = None
    primary_crop: Optional[str] = None
    is_active: bool = True

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}