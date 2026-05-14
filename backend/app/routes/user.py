from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.schemas.user import UserResponse
from app.database.deps import get_db
from app.services.user import get_users,get_user

router=APIRouter(prefix="/users",tags=["Users"])

@router.get("/",response_model=list[UserResponse])
def get_all_users(db:Session=Depends(get_db)):

    return get_users(db)


@router.get("/{user_id}",response_model=UserResponse)
def get_user_by_id(user_id:int,db:Session=Depends(get_db)):

    return get_user(db,user_id)