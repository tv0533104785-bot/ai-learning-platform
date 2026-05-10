from fastapi import APIRouter
from app.models.prompt import PromptRequest
from app.services.prompt import process_prompt

router=APIRouter()

@router.post("/prompt")
def create_prompt(data:PromptRequest):
    return process_prompt(data.text)
