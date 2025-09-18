import logging
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from datetime import timedelta

from ..config import settings
from ..dependencies import (
    get_db,
    verify_password,
    create_access_token,
    get_current_active_user,
)
from ..schemas import UserCreate, User as UserSchema, Token
from .. import crud

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Users & Authentication"])

@router.post("/register", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate, db = Depends(get_db)):
    """
    Register a new user in the database.
    """
    logger.info(f"Registration attempt for email: {user.email}")

    db_user = await crud.get_user_by_email(db, email=user.email)
    
    if db_user:
        logger.warning(f"Registration failed: Email already registered for {user.email}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered."
        )

    new_user = await crud.create_user(db, user=user)
    logger.info(f"User {user.email} successfully registered with ID {new_user['_id']}")
    return new_user

@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db = Depends(get_db)
):
    """
    Authenticate user and return a JWT access token.
    The frontend must send the user's email in the 'username' field.
    """
    logger.info(f"Login attempt for user: {form_data.username}")
    user = await crud.get_user_by_email(db, email=form_data.username)
    
    if not user or not verify_password(form_data.password, user['hashed_password']):
        logger.warning(f"Failed login attempt for user: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user['_id'])}, # Use user ID as the subject of the token
        expires_delta=access_token_expires
    )
    
    logger.info(f"Successful login for user: {form_data.username}")
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserSchema)
async def read_users_me(
    current_user: Annotated[UserSchema, Depends(get_current_active_user)]
):
    """
    Get information about the currently authenticated user.
    """
    return current_user
