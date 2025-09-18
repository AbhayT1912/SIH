# schemas.py
from pydantic import BaseModel

class UserCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    password: str
    language_preference: str = "hi"

class User(BaseModel):
    id: int
    email: str
    full_name: str

    class Config:
        orm_mode = True