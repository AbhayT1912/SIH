from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Annotated
from datetime import datetime

from app.database import get_db
from app.dependencies import get_current_active_user
from app.models.models import User, Crop, MarketPrice
from app.schemas.schemas import MarketPriceCreate, MarketPrice as MarketPriceSchema

router = APIRouter(prefix="/market", tags=["market"])

@router.get("/prices/current", response_model=List[MarketPriceSchema])
async def get_current_prices(
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    market: str = None,
    crop_id: int = None
):
    """Get current market prices, optionally filtered by market or crop."""
    query = db.query(MarketPrice)\
        .filter(MarketPrice.date >= datetime.utcnow().date())
    
    if market:
        query = query.filter(MarketPrice.market_name == market)
    if crop_id:
        query = query.filter(MarketPrice.crop_id == crop_id)
    
    prices = query.order_by(MarketPrice.market_name).all()
    return prices

@router.get("/prices/history/{crop_id}", response_model=List[MarketPriceSchema])
async def get_price_history(
    crop_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    days: int = 30
):
    """Get price history for a specific crop."""
    # Verify crop exists
    crop = db.query(Crop).filter(Crop.id == crop_id).first()
    if not crop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Crop not found"
        )
    
    prices = db.query(MarketPrice)\
        .filter(MarketPrice.crop_id == crop_id)\
        .order_by(MarketPrice.date.desc())\
        .limit(days)\
        .all()
    return prices

@router.get("/markets", response_model=List[str])
async def get_markets(
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get list of available markets."""
    markets = db.query(MarketPrice.market_name)\
        .distinct()\
        .order_by(MarketPrice.market_name)\
        .all()
    return [market[0] for market in markets]

@router.get("/trends/{crop_id}", response_model=dict)
async def get_market_trends(
    crop_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get market trends analysis for a crop."""
    # Verify crop exists
    crop = db.query(Crop).filter(Crop.id == crop_id).first()
    if not crop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Crop not found"
        )
    
    # Get price data for analysis (last 90 days)
    prices = db.query(MarketPrice)\
        .filter(MarketPrice.crop_id == crop_id)\
        .order_by(MarketPrice.date.desc())\
        .limit(90)\
        .all()
    
    if not prices:
        return {
            "trend": "insufficient_data",
            "current_price": None,
            "price_change": None,
            "forecast": None
        }
    
    current_price = prices[0].price if prices else None
    avg_price = sum(p.price for p in prices) / len(prices) if prices else None
    
    # Simple trend analysis
    if len(prices) >= 2:
        price_change = ((prices[0].price - prices[-1].price) / prices[-1].price) * 100
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
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Create new market price entry (admin only)."""
    # TODO: Add admin check
    db_price = MarketPrice(**price.model_dump())
    db.add(db_price)
    db.commit()
    db.refresh(db_price)
    return db_price