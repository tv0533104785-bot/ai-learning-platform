import os
import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_DAYS = int(os.getenv("ACCESS_TOKEN_EXPIRE_DAYS", 1))


def create_access_token(data: dict):
    payload = data.copy()

    payload["exp"] = (
        datetime.now(timezone.utc)
        + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    )

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    except jwt.PyJWTError:
        return None