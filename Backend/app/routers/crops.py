from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Annotated
import numpy as np
from PIL import Image
import io

from app.database import get_db
from app.dependencies import get_current_active_user
from app.models.models import User, Crop, Disease
from app.schemas.schemas import (
    CropCreate,
    Crop as CropSchema,
    CropWithDiseases,
    DiseaseCreate,
    Disease as DiseaseSchema
)

router = APIRouter(prefix="/crops", tags=["crops"])

@router.get("/", response_model=List[CropSchema])
async def list_crops(
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    season: str = None
):
    """Get list of all crops, optionally filtered by season."""
    query = db.query(Crop)
    if season:
        query = query.filter(Crop.season == season)
    return query.all()

@router.get("/{crop_id}", response_model=CropWithDiseases)
async def get_crop(
    crop_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get detailed information about a specific crop."""
    crop = db.query(Crop).filter(Crop.id == crop_id).first()
    if crop is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Crop not found"
        )
    return crop

@router.get("/{crop_id}/diseases", response_model=List[DiseaseSchema])
async def get_crop_diseases(
    crop_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get list of diseases associated with a crop."""
    crop = db.query(Crop).filter(Crop.id == crop_id).first()
    if crop is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Crop not found"
        )
    return crop.diseases

@router.post("/disease-detection", response_model=dict)
async def detect_disease(
    current_user: Annotated[User, Depends(get_current_active_user)],
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
    current_user: Annotated[User, Depends(get_current_active_user)],
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
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Create new crop (admin only)."""
    # TODO: Add admin check
    db_crop = Crop(**crop.model_dump())
    db.add(db_crop)
    db.commit()
    db.refresh(db_crop)
    return db_crop

@router.post("/diseases", response_model=DiseaseSchema)
async def create_disease(
    disease: DiseaseCreate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Create new disease entry (admin only)."""
    # TODO: Add admin check
    db_disease = Disease(**disease.model_dump())
    db.add(db_disease)
    db.commit()
    db.refresh(db_disease)
    return db_disease