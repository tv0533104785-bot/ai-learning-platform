from sqlalchemy.orm import Session
from sqlalchemy import joinedload

from app.models.prompt import Prompt
from app.models.user import User
from app.schemas.prompt import PromptCreate
from app.services.ai import generate_lesson

def create_prompt(db: Session, user: User, data: PromptCreate) -> dict:

    ai_response = generate_lesson(data.prompt)

    prompt = Prompt(
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

    return {
        "id": prompt.id,
        "prompt": prompt.prompt,
        "response": prompt.response,
        "created_at": prompt.created_at,
        "category_id": prompt.category_id,
        "sub_category_id": prompt.sub_category_id,
    }

def get_prompts_by_user(db: Session, user: User) -> list[dict]:

    prompts = (
        db.query(Prompt)
        .filter(Prompt.user_id == user.id)
        .order_by(Prompt.created_at.desc())
        .all()
    )

    result = []
    for p in prompts:
        category = db.query(lambda: None).first()
        result.append({
            "id": p.id,
            "prompt": p.prompt,
            "response": p.response,
            "created_at": p.created_at,
            "category_id": p.category_id,
            "sub_category_id": p.sub_category_id,
        })
    
    return result

