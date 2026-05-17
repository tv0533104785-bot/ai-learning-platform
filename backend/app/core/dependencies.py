import os

from fastapi import Depends
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.models.user import User
from app.core.security import decode_access_token
from app.core.errors import InvalidToken,UserNotFound,AdminUnauthorized

security=HTTPBearer()

def get_current_user(credentials:HTTPAuthorizationCredentials=Depends(security),db:Session=Depends(get_db)):

    token=credentials.credentials

    try:
        payload=decode_access_token(token)
        user_id=payload.get("user_id")

        if not user_id:
            raise InvalidToken()
        
    except Exception:
        raise InvalidToken()
    
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise UserNotFound()

    return user


def get_current_admin_user(user: User = Depends(get_current_user)):
    admin_phone = os.getenv("ADMIN_PHONE")

    if not admin_phone or user.phone != admin_phone:
        raise AdminUnauthorized()

    return user