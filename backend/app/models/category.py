from sqlalchemy import Column,Integer,String
from sqlalchemy.orm import relationship
from app.database.database import Base

class Category(Base):
    __tablename__="categories"

    id=Column(Integer,primary_key=True,index=True)
    name=Column(String,nullable=False,index=True)
    
    sub_categories = relationship("SubCategory",back_populates="category")