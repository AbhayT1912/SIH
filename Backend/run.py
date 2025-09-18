"""FastAPI Backend Application

This module initializes the FastAPI application with routers, middleware, and settings.
Run this script to start the application server.
"""

import uvicorn
import asyncio
import logging
import sys
import os
from app.config import Settings
from app.main import app

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load settings
settings = Settings()

class CustomServer(uvicorn.Server):
    """Custom server class to handle graceful shutdown"""
    def install_signal_handlers(self):
        """Disable the default signal handlers"""
        pass

async def run_app():
    """Run the FastAPI application server with async support"""
    try:
        config = uvicorn.Config(
            app=app,
            host="localhost",
            port=8000,
            log_level="debug",
            reload=False,
            workers=1,
            loop="asyncio",
            timeout_keep_alive=60,
            access_log=True,
            use_colors=True,
            proxy_headers=True
        )

        server = CustomServer(config=config)
        await server.serve()
        logger.info("Server finished running")
    except Exception as e:
        logger.error("Error running server: %s", str(e))
        raise

if __name__ == "__main__":
    try:
        asyncio.run(run_app())
    except KeyboardInterrupt:
        logger.info("Received keyboard interrupt, shutting down...")
    except Exception as e:
        logger.error("Unexpected error: %s", str(e))
        sys.exit(1)