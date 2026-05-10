from pydantic import BaseModel,Field

class PromptRequest(BaseModel):
    text:str=Field(min_length=2,max_length=300)