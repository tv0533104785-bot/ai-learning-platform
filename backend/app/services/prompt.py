from sqlalchemy.orm import Session

from app.models.prompt import Prompt
from app.models.user import User
from app.schemas.prompt import PromptCreate
from app.services.ai import generate_lesson

def create_prompt(db: Session,user:User,data:PromptCreate)->Prompt:

    ai_response=generate_lesson(data.prompt)

    prompt=Prompt(
        user_id=user.id,
        category_id=data.category_id,
        sub_category_id=data.sub_category_id,
        prompt=data.prompt,
        response=ai_response
    )

    db.add(prompt)

    try:
        db.commit()
        db.refresh(prompt)

    except Exception:
        db.rollback()
        raise

    return prompt

def get_prompts_by_user(db: Session, user: User)->list[Prompt]:

    return (
        db.query(Prompt)
        .filter(Prompt.user_id == user.id)
        .order_by(Prompt.created_at.desc())
        .all()
    )
