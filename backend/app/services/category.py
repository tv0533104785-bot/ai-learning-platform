from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.category import Category

def get_categories(db:Session):

    return db.query(Category).all()

def get_category(db:Session,category_id:int):

        category=db.query(Category).filter(Category.id==category_id).first()

        if not category:
              raise HTTPException(status_code=404,detail="Category not found.")
        
        return category