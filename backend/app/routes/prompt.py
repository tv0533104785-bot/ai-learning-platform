from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.schemas.prompt import PromptRequest,PromptResponse
from app.database.deps import get_db
from app.services.prompt import create_prompt

router=APIRouter()

@router.post("/prompts",response_model=PromptResponse)
def create_prompt_endpoint(data:PromptRequest,db:Session=Depends(get_db)):
    return create_prompt(db,data)
