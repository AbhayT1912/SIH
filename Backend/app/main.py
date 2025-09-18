import logging
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Import routers
from .routers import users, farms, crops, market, weather
from .database import verify_database_connection

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="FasalSaathi API",
    description="Backend API for FasalSaathi - Smart Agriculture Management Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Add CORS middleware with more specific configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",  # Vite's default port
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "*"  # Remove this in production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Add request logging middleware
@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    try:
        response = await call_next(request)
        logger.info(f"Response: {response.status_code}")
        return response
    except Exception as e:
        logger.error(f"Request failed: {str(e)}")
        raise

API_PREFIX_V1 = "/api/v1"

app.include_router(users.router, prefix=f"{API_PREFIX_V1}", tags=["Users & Authentication"])
app.include_router(farms.router, prefix=f"{API_PREFIX_V1}/farms", tags=["Farms"])
app.include_router(crops.router, prefix=f"{API_PREFIX_V1}/crops", tags=["Crops"])
app.include_router(market.router, prefix=f"{API_PREFIX_V1}/market", tags=["Market"])
app.include_router(weather.router, prefix=f"{API_PREFIX_V1}/weather", tags=["Weather"])

logger.info("API routers included successfully.")

# --- Root and Health Check Endpoints ---
@app.get("/", tags=["Root"])
async def read_root():
    """Provides basic information about the API."""
    return {
        "message": "Welcome to the FasalSaathi API!",
        "version": app.version,
        "documentation": app.docs_url
    }

@app.get("/api/health", tags=["Health Check"])
async def health_check():
    """Returns the operational status of the API."""
    return {"status": "healthy"}

@app.on_event("startup")
async def startup_event():
    try:
        from .database import verify_database_connection
        # Try to connect with a timeout
        try:
            await asyncio.wait_for(verify_database_connection(), timeout=10.0)
            logger.info("Database connection verified successfully")
        except asyncio.TimeoutError:
            logger.error("Database connection timed out")
            raise ConnectionError("Could not connect to MongoDB Atlas - connection timed out")
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        # Don't raise the error, allow the application to start without DB connection
        # This will let us handle DB errors gracefully in the routes
    logger.info("Application startup complete.")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutting down.")

# This is a basic global exception handler.
# You can expand it to handle specific exceptions differently.
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception for request {request.url}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected server error occurred."},
    )
