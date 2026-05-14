from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate,UserResponse
from app.database.deps import get_db
from app.services.user import create_user
from app.models.user import User
from app.core.errors import UserAlreadyExists

router=APIRouter()

@router.post("/users",response_model=UserResponse)
def create_user_endpoint(data:UserCreate,db:Session=Depends(get_db)):
    try:
        return create_user(db,data)
    except UserAlreadyExists:
        raise HTTPException(status_code=409,detail="User already exists")

@router.get("/users",response_model=UserResponse)
def get_user_by_phone(phone:str,db:Session=Depends(get_db)):

    user=db.query(User).filter(User.phone==phone).first()

    if not user:
        raise HTTPException(status_code=404,detail="User not found")
    
    return user