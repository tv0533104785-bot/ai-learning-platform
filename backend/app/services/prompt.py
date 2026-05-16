from sqlalchemy.orm import Session

from app.models.prompt import Prompt
from app.models.user import User
from app.schemas.prompt import PromptCreate,PromptResponse
from app.services.ai import generate_lesson


def to_prompt_response(p: Prompt) -> PromptResponse:
    return PromptResponse(
        id=p.id,
        prompt=p.prompt,
        response=p.response,
        category_name=p.category.name,
        sub_category_name=p.sub_category.name,
        created_at=p.created_at
    )


def create_prompt(db: Session,user:User,data:PromptCreate)->PromptResponse:

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

    category_name = prompt.category.name if prompt.category else ""
    sub_category_name = prompt.sub_category.name if prompt.sub_category else ""

    return to_prompt_response(prompt)

def get_prompts_by_user(db: Session, user: User):
    prompts = (
        db.query(Prompt)
        .filter(Prompt.user_id == user.id)
        .order_by(Prompt.created_at.desc())
        .all()
    )

    return [
        to_prompt_response(p)for p in prompts
    ]
