from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user import User
from app.core.security import create_access_token

def register_user(db: Session, data):

    user = db.query(User).filter(User.phone == data.phone).first()

    if user:
        raise HTTPException (status_code=409,detail="User already exists")

    new_user = User(
        name=data.name,
        phone=data.phone
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"user_id": new_user.id})

    return{
        "access_token":token,
        "token_type":"bearer"
    }


def login_user(db: Session, data):

    user = db.query(User).filter(User.phone == data.phone).first()

    if not user:
        raise HTTPException(status_code=404,detail="User not found")

    token = create_access_token({"user_id": user.id})

    return{
        "access_token":token,
        "token_type":"bearer"
    }

