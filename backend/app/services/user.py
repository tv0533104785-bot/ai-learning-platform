from sqlalchemy.orm import Session, joinedload

from app.models.user import User
from app.core.errors import UserNotFound


def get_users(db: Session) -> list[User]:

    return db.query(User).all()


def get_users_with_prompt_history(db: Session) -> list[User]:

    return (
        db.query(User)
        .options(joinedload(User.prompts))
        .order_by(User.phone)
        .all()
    )


def get_user(db: Session, user_id: int) -> User:

    user = db.get(User, user_id)

    if not user:
        raise UserNotFound()

    return user