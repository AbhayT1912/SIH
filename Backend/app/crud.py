from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from passlib.context import CryptContext
from . import schemas
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12,
    bcrypt__ident="2b"
)

# User CRUD
async def get_user_by_email(db: AsyncIOMotorDatabase, email: str):
    return await db.users.find_one({"email": email})

async def create_user(db: AsyncIOMotorDatabase, user: schemas.UserCreate):
    try:
        # Check if user already exists
        if await db.users.find_one({"email": user.email}):
            raise ValueError("Email already registered")

        # Hash the password
        hashed_password = pwd_context.hash(user.password)
        
        # Prepare user document
        user_dict = user.model_dump(exclude_unset=True)
        user_dict["hashed_password"] = hashed_password
        user_dict["is_active"] = True
        user_dict["created_at"] = datetime.utcnow()
        user_dict["updated_at"] = datetime.utcnow()
        del user_dict["password"]  # Remove plain password
        
        # Insert into database
        result = await db.users.insert_one(user_dict)
        
        # Fetch and return the new user
        new_user = await db.users.find_one({"_id": result.inserted_id})
        if new_user:
            # Convert ObjectId to string and update the document
            new_user["_id"] = str(new_user["_id"])
            return new_user
        else:
            raise ValueError("Failed to create user")
    except Exception as e:
        logger.error(f"Error creating user: {str(e)}")
        raise

async def get_user(db: AsyncIOMotorDatabase, user_id: str):
    return await db.users.find_one({"_id": ObjectId(user_id)})

# Farm CRUD
async def create_farm(db: AsyncIOMotorDatabase, farm: schemas.FarmCreate, owner_id: str):
    farm_dict = farm.model_dump()
    farm_dict["owner_id"] = owner_id
    result = await db.farms.insert_one(farm_dict)
    new_farm = await db.farms.find_one({"_id": result.inserted_id})
    return new_farm

async def get_farms_by_owner(db: AsyncIOMotorDatabase, owner_id: str, skip: int = 0, limit: int = 100):
    return await db.farms.find({"owner_id": owner_id}).skip(skip).limit(limit).to_list(length=limit)

async def get_farm(db: AsyncIOMotorDatabase, farm_id: str, owner_id: str):
    return await db.farms.find_one({"_id": ObjectId(farm_id), "owner_id": owner_id})

async def update_farm(db: AsyncIOMotorDatabase, farm_id: str, farm_update: schemas.FarmCreate, owner_id: str):
    await db.farms.update_one({"_id": ObjectId(farm_id), "owner_id": owner_id}, {"$set": farm_update.model_dump()})
    updated_farm = await db.farms.find_one({"_id": ObjectId(farm_id)})
    return updated_farm

async def delete_farm(db: AsyncIOMotorDatabase, farm_id: str, owner_id: str):
    result = await db.farms.delete_one({"_id": ObjectId(farm_id), "owner_id": owner_id})
    return result.deleted_count > 0

# Crop CRUD
async def list_crops(db: AsyncIOMotorDatabase, season: str = None):
    query = {}
    if season:
        query["season"] = season
    return await db.crops.find(query).to_list(length=100)

async def get_crop(db: AsyncIOMotorDatabase, crop_id: str):
    return await db.crops.find_one({"_id": ObjectId(crop_id)})

async def get_crop_diseases(db: AsyncIOMotorDatabase, crop_id: str):
    return await db.diseases.find({"crop_id": crop_id}).to_list(length=100)

async def create_crop(db: AsyncIOMotorDatabase, crop: schemas.CropCreate):
    crop_dict = crop.model_dump()
    result = await db.crops.insert_one(crop_dict)
    new_crop = await db.crops.find_one({"_id": result.inserted_id})
    return new_crop

async def create_disease(db: AsyncIOMotorDatabase, disease: schemas.DiseaseCreate):
    disease_dict = disease.model_dump()
    result = await db.diseases.insert_one(disease_dict)
    new_disease = await db.diseases.find_one({"_id": result.inserted_id})
    return new_disease

# Market CRUD
async def get_current_prices(db: AsyncIOMotorDatabase, market: str = None, crop_id: str = None):
    query = {"date": {"$gte": datetime.utcnow().date()}}
    if market:
        query["market_name"] = market
    if crop_id:
        query["crop_id"] = crop_id
    return await db.market_prices.find(query).sort("market_name").to_list(length=100)

async def get_price_history(db: AsyncIOMotorDatabase, crop_id: str, days: int = 30):
    return await db.market_prices.find({"crop_id": crop_id}).sort("date", -1).limit(days).to_list(length=days)

async def get_markets(db: AsyncIOMotorDatabase):
    return await db.market_prices.distinct("market_name")

async def create_market_price(db: AsyncIOMotorDatabase, price: schemas.MarketPriceCreate):
    price_dict = price.model_dump()
    result = await db.market_prices.insert_one(price_dict)
    new_price = await db.market_prices.find_one({"_id": result.inserted_id})
    return new_price

# Weather CRUD
async def get_weather_history(db: AsyncIOMotorDatabase, location: str, days: int = 30):
    return await db.weather_data.find({
        "location": location,
        "date": {"$gte": datetime.utcnow() - timedelta(days=days)}
    }).sort("date", -1).to_list(length=days)

async def create_weather_data(db: AsyncIOMotorDatabase, weather: schemas.WeatherDataCreate):
    weather_dict = weather.model_dump()
    result = await db.weather_data.insert_one(weather_dict)
    new_weather = await db.weather_data.find_one({"_id": result.inserted_id})
    return new_weather




