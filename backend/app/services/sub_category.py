from sqlalchemy.orm import Session

from app.models.category import Category
from app.models.sub_category import SubCategory
from app.core.errors import CategoryNotFound


def get_sub_categories(db: Session,category_id: int) -> list[SubCategory]:

    category = db.get(Category, category_id)

    if not category:
        raise CategoryNotFound()

    return (
        db.query(SubCategory)
        .filter(SubCategory.category_id == category_id)
        .all()
    )