# Srida (MEAN Stack)

A full-stack MEAN application with authentication, product management, and booking features. Built with Express.js, MongoDB, and Angular.

## Features
- JWT Authentication (login/signup)
- Product listing and management
- Buyer and vendor dashboards
- Booking system
- Docker Compose for local development
- Render deployment ready

## Quick Start (Local Development)

1. Clone and setup:
   ```powershell
   git clone <your-repo-url>
   cd srida
   ```

2. Start backend + MongoDB:
   ```powershell
   # Copy env example
   copy backend\.env.example backend\.env
   
   # Start services
   docker-compose up --build
   ```

3. Start frontend:
   ```powershell
   cd frontend
   npm install
   npm start
   ```

Visit http://localhost:4200 in your browser.

## Development Notes
- Backend API runs on http://localhost:5000
- Frontend dev server proxies `/api` requests to backend
- MongoDB runs locally in Docker
- Auth tokens are stored in localStorage

## Deploy to Render

1. Prepare MongoDB:
   - Create a free MongoDB Atlas cluster
   - Get your connection string
   - Create a database user
   - Allow access from any IP (or just Render IPs)

2. Deploy to Render:
   - Fork/push this repo to GitHub
   - Go to render.com and sign up/login
   - Click "New +" and choose "Blueprint"
   - Connect your repo and select it
   - Enter environment variables:
     ```
     MONGO_URI=mongodb+srv://...  # Your Atlas connection string
     JWT_SECRET=some-secure-secret # Generate a secure random string
     NODE_ENV=production
     ```
   - Click "Apply" and wait for deployment

3. Configure CORS:
   - After deploy, get your frontend URL (e.g., https://srida-frontend.onrender.com)
   - Set FRONTEND_URL in Render environment variables
   - Backend will automatically allow CORS from this origin

Your app will be available at the Render URLs (frontend and backend separate).

Notes
- Payments endpoint is a placeholder. For production integrate Stripe/PayPal and secure webhooks.
- For quick local development you can run a local MongoDB or use a free Atlas cluster.

How to push to Git and deploy
1. Initialize git, commit and push to your GitHub/GitLab/Bitbucket repo:

```powershell
cd c:\Users\ADMIN\OneDrive\23eg10b33\srida
git init
git add .
git commit -m "Initial srida backend scaffold"
# Add remote and push (replace URL)
# git remote add origin https://github.com/yourname/yourrepo.git
# git push -u origin main
```

2. On Render, create a new service from the connected repo and select the `render.yaml` manifest or create services manually and set env vars.

If you want, I can:
- Scaffold a full Angular frontend under `frontend/` with the components you listed.
- Add Docker Compose for local dev (backend + MongoDB).
- Create a Git repo in this workspace and make the initial commit for you.
