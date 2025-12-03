# 🚀 Deploy Now - One Page Reference

## Step 1: GitHub (5 min)
```bash
cd /home/harsh/Documents/harsh/uma
git init
git add .
git commit -m "Deploy UMA Tyres"
```
**Create repo**: github.com/new → Name: `uma-tyres-inventory`
```bash
git remote add origin https://github.com/YOUR-USERNAME/uma-tyres-inventory.git
git push -u origin main
```

## Step 2: Backend - Render.com (10 min)
**Sign up**: render.com (use GitHub)  
**New Web Service** → Connect repo

**Settings**:
- Root Directory: `backend`
- Build: `npm install && npm run init-db`
- Start: `npm start`
- Plan: **Free**

**Environment**:
```
NODE_ENV=production
PORT=5000
DATABASE_PATH=./database.sqlite
FRONTEND_URL=*
```

**Deploy** → Copy URL: `https://uma-tyres-backend.onrender.com`

## Step 3: Frontend - Vercel (10 min)
**Update**: `frontend/.env.production`
```
REACT_APP_API_URL=https://uma-tyres-backend.onrender.com/api
```

**Push**:
```bash
git add .
git commit -m "Add production URL"
git push
```

**Sign up**: vercel.com (use GitHub)  
**New Project** → Import repo

**Settings**:
- Root Directory: `frontend`
- Env: `REACT_APP_API_URL=https://uma-tyres-backend.onrender.com/api`

**Deploy** → Copy URL: `https://uma-tyres-inventory.vercel.app`

## Step 4: Update CORS (2 min)
**Render** → Backend → Environment → Edit `FRONTEND_URL`:
```
https://uma-tyres-inventory.vercel.app
```
Save → Auto-redeploys

## ✅ Done!
**App**: https://uma-tyres-inventory.vercel.app  
**Cost**: FREE!  
**Time**: 30 minutes

---

## Quick Commands Reference

```bash
# Check status
git status

# Commit changes
git add .
git commit -m "Your message"
git push

# Both services auto-deploy!
```

## Important URLs

**Dashboards**:
- Render: dashboard.render.com
- Vercel: vercel.com/dashboard
- GitHub: github.com/YOUR-USERNAME/uma-tyres-inventory

**Your Live App**:
- https://uma-tyres-inventory.vercel.app

**API Health**:
- https://uma-tyres-backend.onrender.com/api/health

---

## Need Help?

See detailed guides:
- `DEPLOY_GUIDE.md` - Complete step-by-step
- `DEPLOY_CHECKLIST.md` - Quick checklist
- `DEPLOYMENT_ROADMAP.md` - Visual overview
