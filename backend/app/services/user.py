from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.errors import UserAlreadyExists

def create_user(db:Session,data:UserCreate):
    user=User(
        name=data.name,
        phone=data.phone
    )

    try:
        user=User(phone=data.phone)    
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    except IntegrityError:
        db.rollback()
        raise UserAlreadyExists()     