# ai-learning-platform

AI-powered learning platform backend that generates personalized lessons with OpenAI, tracks prompt history, and exposes admin-style user and prompt APIs.

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT authentication
- OpenAI API via `openai` client

### Dev / Deployment
- Docker Compose
- PostgreSQL container
- Python 3.11
- `python-dotenv`

### Frontend
- Intended stack: React + Vite
- Note: frontend source metadata is not included in this repository checkout; only backend service files are available.

---

## Repository Structure

### Backend
`backend/`
- `Dockerfile` - builds the FastAPI backend image
- `requirements.txt` - Python dependencies
- `.env.example` - environment variable template
- `app/main.py` - FastAPI application entrypoint
- `app/core/` - security, error handling, and auth dependencies
- `app/database/` - SQLAlchemy engine and DB session management
- `app/models/` - ORM models for users, categories, subcategories, and prompts
- `app/schemas/` - Pydantic request/response schemas
- `app/routes/` - API route definitions
- `app/services/` - business logic for auth, categories, prompts, and AI calls
- `app/seeds/` - default category and subcategory seed data

### Docker Compose
`docker-compose.yml` runs:
- `api` - FastAPI backend container
- `db` - PostgreSQL 16 database container

---

## Key Features

- JWT-based user authentication by phone number
- User registration and login
- Category and subcategory browsing
- AI-powered lesson generation from user prompts
- Prompt history retrieval for authenticated users
- Admin-style user listing endpoint
- Automatic category/seeding on startup

---

## Data Model

### `users`
- `id` (PK)
- `name`
- `phone` (unique)

### `categories`
- `id` (PK)
- `name`

### `sub_categories`
- `id` (PK)
- `name`
- `category_id` (FK)

### `prompts`
- `id` (PK)
- `user_id` (FK)
- `category_id` (FK)
- `sub_category_id` (FK)
- `prompt`
- `response`
- `created_at`

---

## API Reference

### Auth
- `POST /auth/register`
  - Request: `name`, `phone`
  - Response: `access_token`, `token_type`
- `POST /auth/login`
  - Request: `phone`
  - Response: `access_token`, `token_type`

### Users
- `GET /users`
  - Returns list of all users
- `GET /users/{user_id}`
  - Returns a single user by ID

### Categories
- `GET /categories`
  - Returns all categories
- `GET /categories/{category_id}`
  - Returns a single category by ID

### Sub Categories
- `GET /sub_categories/by-category/{category_id}`
  - Returns subcategories for a given category

### Prompts
- `POST /prompts`
  - Auth required
  - Request body: `category_id`, `sub_category_id`, `prompt`
  - Creates a prompt and stores the AI response
- `GET /prompts/me`
  - Auth required
  - Returns authenticated user prompt history

---

## Environment Variables

Create `backend/.env` from `backend/.env.example` with:

```env
OPENAI_API_KEY=your_openai_api_key
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=1
DATABASE_URL=postgresql://postgres:password@db:5432/app_db
```

> `DATABASE_URL` is used by SQLAlchemy to connect to PostgreSQL.

---

## Local Setup

### 1. Clone repository

```bash
git clone https://github.com/tv0533104785-bot/ai-learning-platform
cd ai-learning-platform
```

### 2. Configure backend environment

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
# or Git Bash / WSL
source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env
```

Edit `backend/.env` and add your OpenAI API key and database connection string.

### 3. Start services with Docker Compose

```bash
docker-compose up --build
```

### 4. Access the backend

- API: `http://localhost:8000`
- OpenAPI docs: `http://localhost:8000/docs`

---

## Notes

- The backend automatically creates database tables and seeds category/subcategory data on startup.
- The AI lesson generation uses OpenAI chat completion model `gpt-4o`.
- If `frontend` source files are needed, they are not available in this repository checkout; only the backend service is fully present.
