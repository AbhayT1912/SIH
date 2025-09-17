import logging
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .routers import auth_router, farms_router, crops_router, market_router, weather_router
from .config import settings
from .database import create_tables

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Create database tables
logger.debug("Creating database tables...")
create_tables()
logger.debug("Database tables created")

app = FastAPI(
    title="FasalSaathi API",
    description="Backend API for FasalSaathi - Smart Agriculture Management Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

@app.on_event("startup")
async def startup_event():
    """Log when the application starts up."""
    logger.info("Application starting up...")

@app.on_event("shutdown")
async def shutdown_event():
    """Log when the application shuts down."""
    logger.info("Application shutting down...")

# Configure CORS - Allow all origins for testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"]  # Expose all headers
)

# Include routers with prefixes
# Include routers
logger.debug("Including routers...")
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(farms_router, prefix="/api/farms", tags=["Farm Management"])
app.include_router(crops_router, prefix="/api/crops", tags=["Crop Management"])
app.include_router(market_router, prefix="/api/market", tags=["Market Data"])
app.include_router(weather_router, prefix="/api/weather", tags=["Weather Data"])
logger.debug("Routers included")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return JSONResponse(
        content={
            "status": "healthy",
            "version": app.version
        }
    )

@app.get("/")
async def root():
    """Root endpoint with API information"""
    logger.debug("Root endpoint called")
    return JSONResponse(
        content={
            "app_name": "FasalSaathi API",
            "version": app.version,
            "docs_url": "/api/docs",
            "health_check": "/api/health"
        }
    )

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Handle all unhandled exceptions"""
    logger.exception("Unhandled exception occurred: %s", exc)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": str(exc)}
    )