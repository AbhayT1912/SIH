from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Annotated

from app.database import get_db
from app.dependencies import get_current_active_user
from app.models.models import User, Farm
from app.schemas.schemas import (
    FarmCreate,
    Farm as FarmSchema,
    FarmWithCrops,
    FarmWithSoilTests
)

router = APIRouter(prefix="/farms", tags=["farms"])

@router.post("/", response_model=FarmSchema)
async def create_farm(
    farm: FarmCreate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Create a new farm for current user."""
    db_farm = Farm(
        **farm.model_dump(),
        owner_id=current_user.id
    )
    db.add(db_farm)
    db.commit()
    db.refresh(db_farm)
    return db_farm

@router.get("/", response_model=List[FarmSchema])
async def read_farms(
    current_user: Annotated[User, Depends(get_current_active_user)],
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get list of farms for current user."""
    farms = db.query(Farm)\
        .filter(Farm.owner_id == current_user.id)\
        .offset(skip)\
        .limit(limit)\
        .all()
    return farms

@router.get("/{farm_id}", response_model=FarmWithCrops)
async def read_farm(
    farm_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get specific farm details with crops."""
    farm = db.query(Farm)\
        .filter(Farm.id == farm_id, Farm.owner_id == current_user.id)\
        .first()
    if farm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Farm not found"
        )
    return farm

@router.put("/{farm_id}", response_model=FarmSchema)
async def update_farm(
    farm_id: int,
    farm_update: FarmCreate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Update farm details."""
    db_farm = db.query(Farm)\
        .filter(Farm.id == farm_id, Farm.owner_id == current_user.id)\
        .first()
    if db_farm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Farm not found"
        )
    
    for key, value in farm_update.model_dump().items():
        setattr(db_farm, key, value)
    
    db.commit()
    db.refresh(db_farm)
    return db_farm

@router.delete("/{farm_id}")
async def delete_farm(
    farm_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Delete a farm."""
    db_farm = db.query(Farm)\
        .filter(Farm.id == farm_id, Farm.owner_id == current_user.id)\
        .first()
    if db_farm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Farm not found"
        )
    
    db.delete(db_farm)
    db.commit()
    return {"message": "Farm deleted successfully"}

@router.get("/{farm_id}/soil-tests", response_model=FarmWithSoilTests)
async def read_farm_soil_tests(
    farm_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get farm's soil test history."""
    farm = db.query(Farm)\
        .filter(Farm.id == farm_id, Farm.owner_id == current_user.id)\
        .first()
    if farm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Farm not found"
        )
    return farm