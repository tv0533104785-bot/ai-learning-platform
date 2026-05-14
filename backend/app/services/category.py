from sqlalchemy.orm import Session

from app.models.category import Category
from app.core.errors import CategoryNotFound

def get_categories(db:Session)->list[Category]:

    return db.query(Category).all()

def get_category(db:Session,category_id:int)->Category:

    category=db.query(Category).filter(Category.id==category_id).first()
    if not category:
          raise CategoryNotFound()
    
    return category