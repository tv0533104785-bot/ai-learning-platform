from pydantic import BaseModel,Field

class PromptRequest(BaseModel):
    user_id:int
    category_id:int
    sub_category_id:int
    prompt:str

class PromptResponse(BaseModel):
    id:int
    prompt:str
    response:str|None

    class Config:
        from_attributes=True
