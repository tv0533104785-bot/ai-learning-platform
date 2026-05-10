from fastapi import APIRouter
from app.schemas.prompt import PromptRequest,PromptResponse
from app.services.prompt import process_prompt

router=APIRouter()

@router.post("/prompt",response_model=PromptResponse)
def create_prompt(data:PromptRequest):
    return process_prompt(data.text)
