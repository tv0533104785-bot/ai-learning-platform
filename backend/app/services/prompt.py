from sqlalchemy.orm import Session

from app.models.prompt import Prompt
from app.schemas.prompt import PromptRequest
from app.services.ai import generate_lesson

def create_prompt(db: Session,data:PromptRequest):
    ai_response=generate_lesson(data.prompt)

    prompt=Prompt(
        user_id=data.user_id,
        category_id=data.category_id,
        sub_category_id=data.sub_category_id,
        prompt=data.prompt,
        response=ai_response
    )

    db.add(prompt)
    db.commit()
    db.refresh(prompt)

    return prompt