from pydantic import BaseModel,Field,field_validator
import re

class UserCreate(BaseModel):
    name:str=Field(
        min_length=2,
        max_length=20
    )
    
    phone:str=Field(
        min_length=10,
        max_length=10
    )

    @field_validator("name")
    @classmethod
    def validate_name(cls,value):

        if not value.strip():
            raise ValueError("Name cannot be empty")
        
        return value
    
    @field_validator("phone")
    @classmethod
    def validate_phone(cls,value):
        if not re.fullmatch(r"05\d{8}", value):
            raise ValueError(
                "Phone must be a valid Israeli mobile number"
            )

        return value
    
    
class UserResponse(BaseModel):
    id:int
    name:str
    phone:str

    class Config:
        from_attributes=True