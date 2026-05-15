from sqlalchemy.orm import Session
from app.models.category import Category
from app.models.sub_category import SubCategory


categories_data = [
    {
        "name": "Technology",
        "subs": ["Artificial Intelligence", "Cybersecurity", "Cloud Computing", "Robotics", "Blockchain"]
    },
    {
        "name": "Health & Fitness",
        "subs": ["Nutrition", "Workout Plans", "Mental Health", "Yoga", "Sleep Optimization"]
    },
    {
        "name": "Business & Finance",
        "subs": ["Investing", "Startups", "Marketing", "Personal Finance", "E-commerce"]
    },
    {
        "name": "Education",
        "subs": ["Study Techniques", "Languages", "Online Courses", "Exam Prep", "Career Development"]
    },
    {
        "name": "Science",
        "subs": ["Physics", "Chemistry", "Biology", "Space", "Environment"]
    },
    {
        "name": "Arts & Creativity",
        "subs": ["Painting", "Music", "Writing", "Photography", "Design"]
    },
    {
        "name": "Lifestyle",
        "subs": ["Minimalism", "Productivity", "Home Organization", "Travel", "Self Improvement"]
    },
    {
        "name": "Sports",
        "subs": ["Football", "Basketball", "Running", "Gymnastics", "Martial Arts"]
    },
    {
        "name": "Food & Cooking",
        "subs": ["Healthy Recipes", "Baking", "Vegan Cooking", "Fast Meals", "World Cuisine"]
    },
    {
        "name": "Entertainment",
        "subs": ["Movies", "TV Shows", "Gaming", "Music Industry", "Pop Culture"]
    },
]


def seed_categories(db: Session):
    for category_data in categories_data:

        existing = db.query(Category).filter_by(name=category_data["name"]).first()
        if existing:
            category = existing
        else:
            category = Category(name=category_data["name"])
            db.add(category)
            db.flush()

        for sub_name in category_data["subs"]:

            existing_sub = (
                db.query(SubCategory)
                .filter_by(name=sub_name, category_id=category.id)
                .first()
            )

            if existing_sub:
                continue

            sub_category = SubCategory(
                name=sub_name,
                category_id=category.id
            )

            db.add(sub_category)

    db.commit()