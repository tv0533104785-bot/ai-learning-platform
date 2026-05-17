from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.core.dependencies import get_current_admin_user
from app.schemas.admin import AdminUserResponse
from app.services.user import get_users_with_prompt_history

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/users", response_model=list[AdminUserResponse])
def get_admin_users(
    db: Session = Depends(get_db),
    _: object = Depends(get_current_admin_user),
):
    return get_users_with_prompt_history(db)
