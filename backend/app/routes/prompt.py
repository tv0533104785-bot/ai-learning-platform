from fastapi import APIRouter
from app.models.prompt import PromptRequest

router=APIRouter()

@router.post("/prompt")
def create_prompt(data:PromptRequest):
    return{
        "message":"ok",
        "input":data
    }