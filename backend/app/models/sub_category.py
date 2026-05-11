from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class SubCategory(Base):
    __tablename__="sub_categories"

    id=Column(Integer,primary_key=True,index=True)
    name=Column(String,nullable=False,index=True)
    category_id = Column(Integer, ForeignKey("categories.id"), index=True)

    category = relationship("Category",back_populates="sub_categories")