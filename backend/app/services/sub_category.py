from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.category import Category
from app.models.sub_category import SubCategory

def get_sub_categories(db:Session,category_id:int):

    category=db.query(Category).filter(Category.id==category_id).first()

    if not category:
        raise HTTPException(status_code=404,detail="Category not found.")
    
    return db.query(SubCategory).filter(SubCategory.category_id==category_id).all()