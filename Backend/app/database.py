import motor.motor_asyncio
from .config import settings
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
import logging

logger = logging.getLogger(__name__)

# Create the client with retryWrites and SSL settings
client = AsyncIOMotorClient(
    settings.MONGO_DATABASE_URI,
    retryWrites=True,
    serverSelectionTimeoutMS=30000,  # Increased timeout
    maxPoolSize=10,  # Add connection pooling
    waitQueueTimeoutMS=10000  # How long to wait for available connection
)

# Get the database
database = client[settings.DB_NAME]

async def verify_database_connection():
    try:
        # Send a ping to confirm a successful connection
        await client.admin.command('ping')
        logger.info("MongoDB Atlas connection verified successfully!")
        
        # List available databases to verify permissions
        databases = await client.list_database_names()
        logger.info(f"Available databases: {databases}")
        
        return True
    except ConnectionFailure as e:
        if "SSL" in str(e) or "TLS" in str(e):
            logger.error("SSL/TLS Connection Error: Check your MongoDB Atlas SSL/TLS settings")
            logger.error(f"Detailed error: {str(e)}")
            raise ConnectionFailure(
                "SSL/TLS connection failed. Please verify your MongoDB Atlas SSL settings "
                "and ensure you're using a compatible Python version with proper SSL support."
            )
        else:
            logger.error(f"MongoDB Connection Error: {str(e)}")
            raise ConnectionFailure(f"Could not connect to MongoDB Atlas: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error connecting to MongoDB Atlas: {str(e)}")
        raise ConnectionFailure(f"Could not connect to MongoDB Atlas: {str(e)}")

# Helper function to get a specific collection
def get_collection(collection_name: str):
    return database[collection_name]
