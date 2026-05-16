from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.schemas.auth import RegisterRequest,LoginRequest,TokenResponse
from app.services.auth import register_user,login_user

router=APIRouter(prefix="/auth",tags=["Auth"])

@router.post("/register",response_model=TokenResponse)
def register(data:RegisterRequest,db:Session=Depends(get_db)):

    return register_user(db,data)



@router.post("/login",response_model=TokenResponse)
def login(data:LoginRequest,db:Session=Depends(get_db)):

    return login_user(db,data)
