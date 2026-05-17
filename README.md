# AI-Powered Learning Platform

An AI-powered learning platform that generates personalized lessons using OpenAI, tracks prompt history, features an admin dashboard, and exposes custom APIs.

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy & PostgreSQL
- Pydantic
- JWT Authentication
- OpenAI API via `openai` client

### Frontend
- React + Vite

### Dev / Deployment
- Docker Compose
- Python 3.11

---

## Repository Structure

### Backend (`backend/`)
- `Dockerfile` - Builds the FastAPI backend image.
- `requirements.txt` - Python dependencies.
- `.env.example` - Environment variable template.
- `app/main.py` - FastAPI application entrypoint.
- `app/core/` - Security, error handling, and auth dependencies.
- `app/database/` - SQLAlchemy engine and DB session management.
- `app/models/` - ORM models (Users, Categories, Subcategories, Prompts).
- `app/schemas/` - Pydantic request/response schemas.
- `app/routes/` - API route definitions (including admin routes).
- `app/services/` - Business logic for auth, categories, prompts, and AI calls.
- `app/seeds/` - Default category and subcategory seed data.

### Frontend (`frontend/`)
- Contains the React + Vite application source code and layout.

### Docker Compose
- `docker-compose.yml` - Orchestrates the `api` (FastAPI) and `db` (PostgreSQL 16) containers.

---

## Key Features & Admin Dashboard

- **Authentication:** JWT-based user authentication using phone numbers.
- **AI Lesson Generation:** Personalized lessons generated via OpenAI's `gpt-4o` chat completion.
- **History Tracking:** Saves prompt history for authenticated users.
- **Admin Dashboard:** Accessible via `GET /admin/users` (returns all users with their prompt history). 
  - *Note:* Protected by JWT and only accessible to the phone number configured in the `ADMIN_PHONE` environment variable.

---

## Data Model

### `users`
- `id` (PK) | `name` | `phone` (unique)

### `categories` & `sub_categories`
- `id` (PK) | `name` | `category_id` (FK for sub_categories)

### `prompts`
- `id` (PK) | `user_id` (FK) | `category_id` (FK) | `sub_category_id` (FK) | `prompt` | `response` | `created_at`

---

## API Reference

### Auth
- `POST /auth/register` - Request: `name`, `phone` -> Response: `access_token`, `token_type`
- `POST /auth/login` - Request: `phone` -> Response: `access_token`, `token_type`

### Users
- `GET /users` - Returns a list of all users
- `GET /users/{user_id}` - Returns a single user by ID

### Admin
- `GET /admin/users` - Returns all users along with their complete prompt history (Admin only)

### Categories & Subcategories
- `GET /categories` - Returns all categories
- `GET /categories/{category_id}` - Returns a single category by ID
- `GET /sub_categories/by-category/{category_id}` - Returns subcategories for a given category

### Prompts
- `POST /prompts` - (Auth Required) Request body: `category_id`, `sub_category_id`, `prompt`. Generates and stores AI response.
- `GET /prompts/me` - (Auth Required) Returns the authenticated user's prompt history.

---

## Environment Variables

Create a `.env` file inside the `backend/` directory based on `backend/.env.example`:

```env
OPENAI_API_KEY=your_openai_api_key
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=1
DATABASE_URL=postgresql://postgres:password@db:5432/app_db
ADMIN_PHONE=your_admin_phone_number
```

> `DATABASE_URL` is used by SQLAlchemy to connect to PostgreSQL.

---

## Local Setup

### 1. Clone repository

```bash
git clone https://github.com/TziliVilensky/ai-learning-platform
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

### 4. Run the Frontend App

```bash
cd frontend
npm install
npm run dev
```


### 5. How to Access & Test

- **Frontend App (UI):** Open the URL printed in your terminal after running `npm run dev` (usually `http://localhost:5173`). You can **Ctrl + Click** the link directly from the terminal to open it.
- **Backend API:** `http://localhost:8000`
- **Interactive Swagger Documentation:** `http://localhost:8000/docs`

---

## Testing Admin Features via Swagger Docs
1. Open http://localhost:8000/docs in your browser.

2. Use the /auth/login endpoint to log in using the exact phone number specified in your ADMIN_PHONE environment variable.

3. Copy the string value of the returned access_token.

4. Click the Authorize button located at the top right of the Swagger UI page.

5. Type Bearer <your_copied_token> and click Authorize.

6. Scroll down to test the GET /admin/users endpoint successfully.