from fastapi import FastAPI
from dotenv import load_dotenv


load_dotenv()

import os

print("API KEY LOADED:", os.getenv("OPENAI_API_KEY") is not None)

from app.routes.prompt import router as prompt_router
from app.database.database import Base,engine
from app.models.category import Category
from app.models.prompt import Prompt
from app.models.sub_category import SubCategory
from app.models.user import User

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "server is running"}

app.include_router(prompt_router)