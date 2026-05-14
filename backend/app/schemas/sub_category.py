from pydantic import BaseModel

class SubCategoryResponse(BaseModel):
    id:int
    name:str
    category_id:int

    class Config:
        from_attributes=True