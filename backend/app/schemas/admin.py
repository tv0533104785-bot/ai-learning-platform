from pydantic import BaseModel

from app.schemas.prompt import PromptResponse


class AdminUserResponse(BaseModel):
    name: str
    phone: str
    prompts: list[PromptResponse] = []

    class Config:
        from_attributes = True
