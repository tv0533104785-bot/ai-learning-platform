from sqlalchemy.orm import Session
from app.models.prompt import Prompt
from app.schemas.prompt import PromptRequest

def create_prompt(db: Session,data:PromptRequest):
    prompt=Prompt(
        user_id=data.user_id,
        category_id=data.category_id,
        sub_category_id=data.sub_category_id,
        prompt=data.prompt,
        response=None
    )

    db.add(prompt)
    db.commit()
    db.refresh(prompt)

    return prompt