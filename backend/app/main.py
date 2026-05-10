from fastapi import FastAPI
from app.routes.prompt import router as prompt_router

app = FastAPI()

@app.get("/")
def root():
    return {"message": "server is running"}

app.include_router(prompt_router)