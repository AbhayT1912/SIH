from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from typing import List, Annotated
import numpy as np
from PIL import Image
import io

from ..dependencies import get_db, get_current_active_user
from ..schemas import (
    CropCreate,
    Crop as CropSchema,
    DiseaseCreate,
    Disease as DiseaseSchema,
    User as UserSchema
)
from .. import crud

router = APIRouter(tags=["Crops"])

@router.get("/", response_model=List[CropSchema])
async def list_crops(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db),
    season: str = None
):
    """Get list of all crops, optionally filtered by season."""
    return await crud.list_crops(db, season=season)

@router.get("/{crop_id}", response_model=CropSchema)
async def get_crop(
    crop_id: str,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Get detailed information about a specific crop."""
    crop = await crud.get_crop(db, crop_id=crop_id)
    if crop is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Crop not found"
        )
    return crop

@router.get("/{crop_id}/diseases", response_model=List[DiseaseSchema])
async def get_crop_diseases(
    crop_id: str,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Get list of diseases associated with a crop."""
    diseases = await crud.get_crop_diseases(db, crop_id=crop_id)
    return diseases

@router.post("/disease-detection", response_model=dict)
async def detect_disease(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    image: UploadFile = File(...)
):
    """Detect plant diseases from uploaded image."""
    # Validate file
    if not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be an image"
        )
    
    try:
        # Read and preprocess image
        contents = await image.read()
        img = Image.open(io.BytesIO(contents))
        img = img.resize((224, 224))  # Resize to model input size
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)
        
        # TODO: Load and use ML model for prediction
        # For now, return dummy response
        return {
            "disease_detected": True,
            "disease_name": "Sample Disease",
            "confidence": 0.95,
            "recommendations": [
                "Apply appropriate fungicide",
                "Improve air circulation",
                "Remove affected leaves"
            ]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing image: {str(e)}"
        )

@router.post("/recommendation", response_model=dict)
async def get_crop_recommendation(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    soil_data: dict
):
    """Get crop recommendations based on soil and weather data."""
    # TODO: Implement ML model for crop recommendation
    return {
        "recommended_crops": [
            {
                "crop_name": "Wheat",
                "confidence": 0.85,
                "reason": "Suitable soil pH and nitrogen levels"
            },
            {
                "crop_name": "Maize",
                "confidence": 0.75,
                "reason": "Good water availability and temperature"
            }
        ],
        "soil_health": {
            "status": "good",
            "recommendations": [
                "Add organic matter to improve structure",
                "Maintain current irrigation practices"
            ]
        }
    }

# Admin endpoints for managing crops and diseases
@router.post("/", response_model=CropSchema)
async def create_crop(
    crop: CropCreate,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Create new crop (admin only)."""
    # TODO: Add admin check
    return await crud.create_crop(db, crop=crop)

@router.post("/diseases", response_model=DiseaseSchema)
async def create_disease(
    disease: DiseaseCreate,
    current_user: Annotated[UserSchema, Depends(get_current_active_user)],
    db = Depends(get_db)
):
    """Create new disease entry (admin only)."""
    # TODO: Add admin check
    return await crud.create_disease(db, disease=disease)
