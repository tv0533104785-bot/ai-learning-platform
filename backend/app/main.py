import os
from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

if os.getenv("ENV") != "docker":
    load_dotenv()

from app.database.database import SessionLocal,Base,engine
from app.seeds.categories import seed_categories
from app.models import *

from app.routes.auth import router as auth_router
from app.routes.category import router as category_router
from app.routes.sub_category import router as sub_category_router
from app.routes.prompt import router as prompt_router
from app.routes.user import router as user_router
from app.core.errors import AppException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(AppException)
def app_exception_handler(_:Request,exc:AppException):

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error":{
                "type":exc.error_type,
                "message":exc.detail
            }
        }
    )

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


    db=SessionLocal()

    try:
        seed_categories(db)
    
    finally:
        db.close()

app.include_router(auth_router)
app.include_router(category_router)
app.include_router(sub_category_router)
app.include_router(prompt_router)
app.include_router(user_router)
