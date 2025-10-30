# Deploying Srida to Render

This document shows step-by-step instructions to deploy the `srida` repository (backend and frontend) to Render using the `render.yaml` already present in the repo.

## Preconditions
- Repository is pushed to GitHub and connected to your GitHub account.
- You have a Render account: https://dashboard.render.com/
- You have a MongoDB Atlas URI (or another managed MongoDB) for `MONGO_URI`.
- Generate a secure `JWT_SECRET` (a long random string).

## 1) Connect the repository in Render (Dashboard)
1. Sign in at https://dashboard.render.com/.
2. Click "New" → "Web Service" or click "New" → "Static Site" if you want to create manually — but the easiest is:
   - Click "New" → "Connect a repository" and connect GitHub.
3. Authorize Render to access the `dishmitha/srida` repository.
4. When Render detects `render.yaml`, choose "Create services from render.yaml". Render will create two services:
   - `srida-backend` (Docker web service using `backend/Dockerfile`).
   - `srida-frontend` (Static site serving `frontend/dist`).

## 2) Set environment variables (Backend service)
1. In Render dashboard, open the `srida-backend` service page.
2. Go to the "Environment" tab → "Environment Variables".
3. Add:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = a secure random string
   - (Optional) `FRONTEND_URL` = the frontend site URL (e.g., `https://srida-frontend.onrender.com`)
4. Save the variables — Render will re-deploy the service after changes.

Notes:
- Render sets `PORT` automatically; the backend reads `process.env.PORT`.
- Ensure your Atlas cluster allows connections from Render (IP whitelist). For testing, you can allow access from anywhere, but for production whitelist specific IP ranges.

## 3) Build & deploy (automatic)
- Render will build and deploy each service automatically after creation. Monitor the "Logs" panel on each service page.

## 4) Verify deployment (quick checks)
- Backend health endpoint (example):
  - `https://<backend-service>.onrender.com/api/health`
  - Should return JSON `{ ok: true, env: 'production' }` or similar.
- Frontend: Visit `https://<frontend-service>.onrender.com` and ensure the Angular app loads.

## 5) CLI helper (optional)
- Install Render CLI: https://render.com/docs/render-cli
- Login:
```powershell
render login
```
- List services to find IDs:
```powershell
render services list
```
- Set env vars via CLI (example):
```powershell
render services env set <BACKEND_SERVICE_ID> MONGO_URI "mongodb+srv://<user>:<pass>@cluster0.mongodb.net/srida"
render services env set <BACKEND_SERVICE_ID> JWT_SECRET "a_very_long_secret"
```

## 6) Troubleshooting
- Build fails for frontend: ensure `frontend/package.json` has a `build` script (Angular CLI) and that `frontend/dist` is the publish directory.
- Backend cannot connect to MongoDB: confirm `MONGO_URI` is correct and Atlas whitelist allows connections.
- CORS errors: set `FRONTEND_URL` and add CORS origin in backend `server.js` if needed.

## 7) Security
- Never commit secrets to the repo. Use Render environment variables.
- Use strong `JWT_SECRET` and rotate keys when necessary.

---

If you'd like, I can also:
- Run a quick health check using a small script I will add in `deploy/verify_render.ps1` to test the backend and frontend URLs.
- Provide exact commands customized to your service IDs once you create the services in Render.
