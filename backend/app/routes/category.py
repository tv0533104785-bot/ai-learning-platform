from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.schemas.category import CategoryResponse
from app.services.category import get_categories,get_category

router=APIRouter(prefix="/categories",tags=["Categories"])

@router.get("/",response_model=list[CategoryResponse])
def get_all_categories(db:Session=Depends(get_db)):

    return get_categories(db)

@router.get("/{category_id}",response_model=CategoryResponse)
def get_category_by_id(category_id:int,db:Session=Depends(get_db)):

    return get_category(db,category_id)