from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Annotated

from ..dependencies import get_db, get_current_active_user
from ..schemas import FarmCreate, Farm as FarmSchema, User as UserSchema
from .. import crud

router = APIRouter(tags=["Farms"])

@router.post("/", response_model=FarmSchema)
async def create_farm(
    farm: FarmCreate,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Create a new farm for current user."""
    new_farm = await crud.create_farm(db, farm=farm, owner_id=str(current_user.id))
    return new_farm

@router.get("/", response_model=List[FarmSchema])
async def read_farms(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    skip: int = 0,
    limit: int = 100,
    db = Depends(get_db)
):
    """Get list of farms for current user."""
    farms = await crud.get_farms_by_owner(db, owner_id=str(current_user.id), skip=skip, limit=limit)
    return farms

@router.get("/{farm_id}", response_model=FarmSchema)
async def read_farm(
    farm_id: str,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Get specific farm details."""
    farm = await crud.get_farm(db, farm_id=farm_id, owner_id=str(current_user.id))
    if farm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Farm not found"
        )
    return farm

@router.put("/{farm_id}", response_model=FarmSchema)
async def update_farm(
    farm_id: str,
    farm_update: FarmCreate,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Update farm details."""
    updated_farm = await crud.update_farm(db, farm_id=farm_id, farm_update=farm_update, owner_id=str(current_user.id))
    if updated_farm is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Farm not found"
        )
    return updated_farm

@router.delete("/{farm_id}")
async def delete_farm(
    farm_id: str,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Delete a farm."""
    deleted = await crud.delete_farm(db, farm_id=farm_id, owner_id=str(current_user.id))
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Farm not found"
        )
    return {"message": "Farm deleted successfully"}
