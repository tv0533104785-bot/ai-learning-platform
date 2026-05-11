from app.database.database import Base,engine,SessionLocal
from app.models.user import User
from app.models.category import Category
from app.models.sub_category import SubCategory
from app.models.prompt import Prompt

Base.metadata.create_all(bind=engine)
print("Tables created")

db=SessionLocal()


user=User(
    name="Tzili",
    phone="0533104785"
)

db.add(user)
db.commit()
db.refresh(user)

print("User inserted:",user.id)


category = Category(
    name="Science"
)

db.add(category)
db.commit()
db.refresh(category)

print("Category inserted:", category.id)


sub_category = SubCategory(
    name="Space",
    category_id=category.id
)

db.add(sub_category)
db.commit()
db.refresh(sub_category)

print("SubCategory inserted:", sub_category.id)


prompt = Prompt(
    user_id=user.id,
    category_id=category.id,
    sub_category_id=sub_category.id,
    prompt="Teach me about black holes",
    response="Black holes are regions of spacetime..."
)

db.add(prompt)
db.commit()
db.refresh(prompt)

print("Prompt inserted:", prompt.id)

db.close()

print("Everything works.")