from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

from app.database.database import Base,engine
from app.models import *
from app.routes.auth import router as auth_router
from app.routes.category import router as category_router
from app.routes.sub_category import router as sub_category_router
from app.routes.prompt import router as prompt_router
from app.routes.user import router as user_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(category_router)
app.include_router(sub_category_router)
app.include_router(prompt_router)
app.include_router(user_router)
