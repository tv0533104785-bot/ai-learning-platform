from pydantic import BaseModel,Field,field_validator

class PromptCreate(BaseModel):
    category_id:int=Field(gt=0)
    sub_category_id:int=Field(gt=0)

    prompt:str=Field(
        min_length=2,
        max_length=2000
    )

    @field_validator("prompt")
    @classmethod
    def validate_prompt(cls,value):
        
        cleaned=value.strip()

        if not cleaned:
            raise ValueError("Prompt cannot be empty")
        
        return cleaned

class PromptResponse(BaseModel):
    id:int
    prompt:str
    response:str|None

    class Config:
        from_attributes=True