from pydantic import BaseModel,Field,field_validator
  
class UserResponse(BaseModel):
    id:int
    name:str
    phone:str

    class Config:
        from_attributes=True