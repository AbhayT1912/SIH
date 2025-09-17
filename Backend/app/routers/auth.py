import logging
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from datetime import timedelta
from sqlalchemy.orm import Session

from app.config import Settings
from app.database import get_db
from app.dependencies import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_active_user
)
from app.models.models import User
from app.schemas.schemas import UserCreate, User as UserSchema, Token

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/auth", tags=["authentication"])
settings = Settings()

@router.post("/register", response_model=UserSchema)
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user."""
    logger.debug("Registration request received: %s", user.model_dump())
    try:
        # Check if user exists
        logger.debug("Checking if user exists...")
        if db.query(User).count() > 0:
            logger.warning("Users table exists and has records")
        else:
            logger.warning("Users table exists but is empty")

        db_user = db.query(User).filter(
            (User.email == user.email) | (User.phone == user.phone)
        ).first()
        if db_user:
            logger.warning("User already exists")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email or phone already registered"
            )

        # Create new user
        logger.debug("Creating new user...")
        try:
            hashed_password = get_password_hash(user.password)
            logger.debug("Password hashed successfully")
        except Exception as hash_error:
            logger.error("Error hashing password: %s", str(hash_error))
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error processing password"
            )

        db_user = User(
            email=user.email,
            phone=user.phone,
            full_name=user.full_name,
            hashed_password=hashed_password,
            language_preference=user.language_preference
        )
        
        logger.debug("Adding user to database...")
        try:
            db.add(db_user)
            logger.debug("User added to session")
            db.commit()
            logger.debug("Changes committed to database")
            db.refresh(db_user)
            logger.debug("User object refreshed")
            logger.info("User successfully registered")
            return db_user
        except Exception as db_error:
            logger.error("Database error: %s", str(db_error))
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error saving to database"
            )
    except HTTPException:
        logger.error("Known error occurred")
        raise
    except Exception as e:
        logger.error("Unexpected error during registration: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred"
        )
    # Check if user exists
    db_user = db.query(User).filter(
        (User.email == user.email) | (User.phone == user.phone)
    ).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or phone already registered"
        )

    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        phone=user.phone,
        full_name=user.full_name,
        hashed_password=hashed_password,
        language_preference=user.language_preference
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db)
):
    """Login to get access token."""
    # Try to find user by email
    user = db.query(User).filter(User.email == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserSchema)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    """Get current user information."""
    return current_user