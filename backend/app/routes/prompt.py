from fastapi import APIRouter

router=APIRouter()

@router.post("/prompt")
def create_prompt(data:dict):
    return{
        "message":"ok",
        "input":data
    }