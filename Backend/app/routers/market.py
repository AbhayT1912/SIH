from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Annotated
from datetime import datetime

from ..dependencies import get_db, get_current_active_user
from ..schemas import MarketPriceCreate, MarketPrice as MarketPriceSchema, User as UserSchema
from .. import crud

router = APIRouter(tags=["Market"])

@router.get("/prices/current", response_model=List[MarketPriceSchema])
async def get_current_prices(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db),
    market: str = None,
    crop_id: str = None
):
    """Get current market prices, optionally filtered by market or crop."""
    prices = await crud.get_current_prices(db, market=market, crop_id=crop_id)
    return prices

@router.get("/prices/history/{crop_id}", response_model=List[MarketPriceSchema])
async def get_price_history(
    crop_id: str,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db),
    days: int = 30
):
    """Get price history for a specific crop."""
    # Verify crop exists
    crop = await crud.get_crop(db, crop_id=crop_id)
    if not crop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Crop not found"
        )
    
    prices = await crud.get_price_history(db, crop_id=crop_id, days=days)
    return prices

@router.get("/markets", response_model=List[str])
async def get_markets(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Get list of available markets."""
    markets = await crud.get_markets(db)
    return markets

@router.get("/trends/{crop_id}", response_model=dict)
async def get_market_trends(
    crop_id: str,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Get market trends analysis for a crop."""
    # Verify crop exists
    crop = await crud.get_crop(db, crop_id=crop_id)
    if not crop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Crop not found"
        )
    
    # Get price data for analysis (last 90 days)
    prices = await crud.get_price_history(db, crop_id=crop_id, days=90)
    
    if not prices:
        return {
            "trend": "insufficient_data",
            "current_price": None,
            "price_change": None,
            "forecast": None
        }
    
    current_price = prices[0]["price"] if prices else None
    avg_price = sum(p["price"] for p in prices) / len(prices) if prices else None
    
    # Simple trend analysis
    if len(prices) >= 2:
        price_change = ((prices[0]["price"] - prices[-1]["price"]) / prices[-1]["price"]) * 100
        trend = "rising" if price_change > 0 else "falling"
    else:
        price_change = None
        trend = "stable"
    
    return {
        "trend": trend,
        "current_price": current_price,
        "average_price": avg_price,
        "price_change": price_change,
        "forecast": "TODO: Implement price forecast"
    }

# Admin endpoints for managing market data
@router.post("/prices", response_model=MarketPriceSchema)
async def create_market_price(
    price: MarketPriceCreate,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Create new market price entry (admin only)."""
    # TODO: Add admin check
    return await crud.create_market_price(db, price=price)
