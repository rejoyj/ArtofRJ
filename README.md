# ArtofRJ Blog Platform

A full-stack artistic blog platform for writers and authors.

- **Frontend:** React + Tailwind CSS (deploy to Vercel)
- **Backend:** Node.js + Express (deploy to Render)
- **Database:** MongoDB Atlas
- **Image uploads:** Cloudinary (recommended for production) or local fallback
- **Access model:**
  - Public users can **only read blogs**
  - Admin can log in and **create posts with image uploads**

## Project structure

- `client/` → React + Tailwind frontend
- `server/` → Express + MongoDB API
- `render.yaml` → Render deployment config

## Local development

### 1) Install dependencies

```bash
npm install
npm run install:all
```

### 2) Configure backend env

```bash
cp server/.env.example server/.env
```

Update values in `server/.env`.

> Generate password hash for `ADMIN_PASSWORD_HASH`:

```bash
 codex/create-full-blog-page-with-react-and-tailwind-jcwq1q
cd server

codex/create-full-blog-page-with-react-and-tailwind-nractx
cd server
 main
 main
node -e "import bcrypt from 'bcryptjs'; bcrypt.hash('your-admin-password', 10).then(console.log)"
```

### 3) Configure frontend env

```bash
cp client/.env.example client/.env
```

Set `VITE_API_BASE_URL` to your backend URL, e.g. `http://localhost:5000/api`.

### 4) Run both apps

```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## API endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts` (admin token required, multipart form)

codex/create-full-blog-page-with-react-and-tailwind-jcwq1q
 codex/create-full-blog-page-with-react-and-tailwind-nractx
 main
## Common local issues

### "Invalid credentials"

- Ensure backend variable is exactly `MONGODB_URI`.
- Ensure `ADMIN_EMAIL` matches what you type in the login form.
- Ensure `ADMIN_PASSWORD_HASH` is a real bcrypt hash (not `your_bcrypt_hash`).
- Restart the backend after changing `.env`.

### `404 /favicon.ico`

- A favicon is included at `client/public/favicon.svg`.
- Hard-refresh browser cache (`Ctrl+Shift+R`) if old requests still appear.

 codex/create-full-blog-page-with-react-and-tailwind-jcwq1q

 main
main
## Deploy backend to Render

1. Push repo to GitHub.
2. In Render, create a new Web Service from this repo.
3. Set **Root Directory** to `server`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add env vars from `server/.env.example`.
7. Ensure `CLIENT_ORIGIN` is your Vercel frontend domain.

## Deploy frontend to Vercel

1. Import same repo in Vercel.
2. Set **Root Directory** to `client`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add env var: `VITE_API_BASE_URL=https://<your-render-url>/api`

`client/vercel.json` is included for SPA route rewrites.

## Notes

- For production image persistence use Cloudinary env vars.
- If Cloudinary vars are missing, images are stored locally on the server filesystem (not durable on Render restarts).
