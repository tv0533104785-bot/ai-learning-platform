from sqlalchemy.orm import Session

from app.schemas.auth import RegisterRequest,LoginRequest,TokenResponse
from app.models.user import User
from app.core.security import create_access_token
from app.core.errors import UserAlreadyExists,UserNotFound

def generate_user_token(user_id:int):
    return create_access_token({
        "user_id":user_id
    })


def register_user(db: Session, data:RegisterRequest)->TokenResponse:

    user = db.query(User).filter(User.phone == data.phone).first()

    if user:
        raise UserAlreadyExists()

    new_user = User(
        name=data.name,
        phone=data.phone
    )

    db.add(new_user)

    try:
        db.commit()
        db.refresh(new_user)

    except Exception:
        db.rollback()
        raise

    token = generate_user_token(new_user.id)

    return TokenResponse(
        access_token=token,
        token_type="bearer"
    )


def login_user(db: Session, data:LoginRequest)->TokenResponse:

    user = db.query(User).filter(User.phone == data.phone).first()

    if not user:
        raise UserNotFound()

    token = generate_user_token(user.id)

    return TokenResponse(
        access_token=token,
        token_type="bearer"
    )