from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.schemas.sub_category import SubCategoryResponse
from app.services.sub_category import get_sub_categories

router=APIRouter(prefix="/sub_categories",tags=["Sub Categories"])

@router.get("/by-category/{category_id}",response_model=list[SubCategoryResponse])
def get_sub_categories_by_parent_category_id(category_id:int,db:Session=Depends(get_db)):

    return get_sub_categories(db,category_id)
