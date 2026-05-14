from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.core.dependencies import get_current_user
from app.models. user import User
from app.models.prompt import Prompt
from app.schemas.prompt import PromptCreate,PromptResponse
from app.services.prompt import create_prompt,get_prompts_by_user

router=APIRouter(prefix="/prompts",tags=["Prompts"])

@router.post("/",response_model=PromptResponse)
def create_prompt_endpoint(data:PromptCreate,db:Session=Depends(get_db),user:User=Depends(get_current_user)):
    return create_prompt(db,user,data)

@router.get("/me",response_model=list[PromptResponse])
def get_prompt_by_user_endpoint(db:Session=Depends(get_db),user:User=Depends(get_current_user)):

    return get_prompts_by_user(db,user)
