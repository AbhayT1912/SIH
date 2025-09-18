import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .routers import users, farms, crops, market, weather

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Change this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
