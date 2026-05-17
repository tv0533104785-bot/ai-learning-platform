# ai-learning-platform
AI-powered learning platform that generates personalized lessons using OpenAI, with full prompt history and admin dashboard.

## Admin dashboard
- `GET /admin/users` returns all users with their prompt history.
- Protected by JWT and only accessible to the phone number configured in `ADMIN_PHONE`.

### Backend setup
1. Set `ADMIN_PHONE` in `backend/.env` to the admin phone number you want to use.
2. Start the backend and authenticate with `/auth/login` using that same phone.
3. Copy the returned access token.

### Using Swagger
1. Open `http://127.0.0.1:8000/docs`.
2. Use the `/auth/login` endpoint to login by phone.
3. Copy the token and click the `Authorize` button.
4. Enter `Bearer <token>` and authorize.
5. Call `GET /admin/users` to view all users and their prompt history.

### Using the UI
1. Start the frontend with `npm install` and `npm run dev` in the `frontend/` folder.
2. Open the app in your browser.
3. Go to `/login`, enter the admin phone, and login.
4. Navigate to `/admin` to see the admin dashboard.
