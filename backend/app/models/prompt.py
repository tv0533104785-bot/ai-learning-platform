from sqlalchemy import Column,Integer,ForeignKey,DateTime,Text
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.database import Base

class Prompt(Base):
    __tablename__="prompts"

    id=Column(Integer,primary_key=True,index=True)

    user_id=Column(Integer,ForeignKey("users.id"),index=True)
    category_id=Column(Integer,ForeignKey("categories.id"),index=True)
    sub_category_id=Column(Integer,ForeignKey("sub_categories.id"),index=True)

    prompt=Column(Text,nullable=False)
    response=Column(Text,nullable=True)

    created_at=Column(DateTime,default=datetime.utcnow)

    user=relationship("User",back_populates="prompts")