from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean, Table
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base

# Association table for many-to-many relationship between farms and crops
farm_crops = Table(
    'farm_crops',
    Base.metadata,
    Column('farm_id', Integer, ForeignKey('farms.id')),
    Column('crop_id', Integer, ForeignKey('crops.id'))
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    language_preference = Column(String, default="en")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    farms = relationship("Farm", back_populates="owner")

class Farm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    location = Column(String)
    area = Column(Float)  # in hectares
    soil_type = Column(String)
    irrigation_type = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    owner = relationship("User", back_populates="farms")
    crops = relationship("Crop", secondary=farm_crops, back_populates="farms")
    soil_tests = relationship("SoilTest", back_populates="farm")

class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    name_hindi = Column(String)
    scientific_name = Column(String)
    season = Column(String)  # rabi, kharif, zaid
    duration = Column(Integer)  # in days
    water_requirement = Column(Float)  # in mm
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    farms = relationship("Farm", secondary=farm_crops, back_populates="crops")
    diseases = relationship("Disease", back_populates="crop")

class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    name_hindi = Column(String)
    crop_id = Column(Integer, ForeignKey("crops.id"))
    symptoms = Column(String)
    prevention = Column(String)
    treatment = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    crop = relationship("Crop", back_populates="diseases")

class SoilTest(Base):
    __tablename__ = "soil_tests"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    ph = Column(Float)
    nitrogen = Column(Float)  # in kg/ha
    phosphorus = Column(Float)  # in kg/ha
    potassium = Column(Float)  # in kg/ha
    organic_matter = Column(Float)  # in percentage
    test_date = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    farm = relationship("Farm", back_populates="soil_tests")

class WeatherData(Base):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String)
    temperature = Column(Float)
    humidity = Column(Float)
    rainfall = Column(Float)
    wind_speed = Column(Float)
    date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)

class MarketPrice(Base):
    __tablename__ = "market_prices"

    id = Column(Integer, primary_key=True, index=True)
    crop_id = Column(Integer, ForeignKey("crops.id"))
    market_name = Column(String)
    price = Column(Float)  # in INR per quintal
    date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)