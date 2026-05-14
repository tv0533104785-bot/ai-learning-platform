import jwt
from datetime import datetime,timedelta,timezone


SECRET_KEY="secret"
ALGORITHM="HS256"

def create_access_token(data:dict):
    payload=data.copy()
    payload["exp"]=datetime.now(timezone.utc)+timedelta(days=1)
    return jwt.encode(payload,SECRET_KEY,algorithm=ALGORITHM)

def decode_access_token(token:str):
    return jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])

