from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session

from app.schemas.prompt import PromptCreate,PromptResponse
from app.database.deps import get_db
from app.services.prompt import create_prompt
from app.models.prompt import Prompt

router=APIRouter()

@router.post("/prompts",response_model=PromptResponse)
def create_prompt_endpoint(data:PromptCreate,db:Session=Depends(get_db)):
    return create_prompt(db,data)

@router.get("/prompts",response_model=PromptResponse)
def get_prompt_by_id(id:int,db:Session=Depends(get_db)):

    prompt=db.query(Prompt).filter(Prompt.id==id).first()

    if not prompt:
        raise HTTPException(status_code=404,detail="Prompt not found")
    
    return prompt
