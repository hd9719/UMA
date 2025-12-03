# ⚡ Quick Deployment Checklist - UMA Tyres

## 📦 Pre-Deployment Setup

```bash
cd /home/harsh/Documents/harsh/uma

# Initialize Git
git init
git add .
git commit -m "Initial commit - UMA Tyres"
```

## 🌐 Step 1: GitHub (5 minutes)

1. Create repo: https://github.com/new
   - Name: `uma-tyres-inventory`
   - Private or Public
   - Click "Create"

2. Push code:
```bash
git remote add origin https://github.com/YOUR-USERNAME/uma-tyres-inventory.git
git push -u origin main
```

## 🔧 Step 2: Deploy Backend - Render.com (10 minutes)

1. Sign up: https://render.com (use GitHub)

2. Click "New +" → "Web Service"

3. Connect repo: `uma-tyres-inventory`

4. Configure:
   - **Name**: `uma-tyres-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run init-db`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_PATH=./database.sqlite
   FRONTEND_URL=*
   ```

6. Click "Create Web Service"

7. **Copy your backend URL**: 
   ```
   https://uma-tyres-backend.onrender.com
   ```

## 🎨 Step 3: Deploy Frontend - Vercel (10 minutes)

1. Update API URL:
```bash
# Edit: frontend/.env.production
REACT_APP_API_URL=https://uma-tyres-backend.onrender.com/api
```

2. Commit and push:
```bash
git add .
git commit -m "Update production API URL"
git push
```

3. Sign up: https://vercel.com (use GitHub)

4. Click "Add New..." → "Project"

5. Import `uma-tyres-inventory`

6. Configure:
   - **Root Directory**: `frontend`
   - Framework: Create React App (auto-detected)

7. Environment Variables:
   ```
   REACT_APP_API_URL=https://uma-tyres-backend.onrender.com/api
   ```

8. Click "Deploy"

9. **Copy your frontend URL**: 
   ```
   https://uma-tyres-inventory.vercel.app
   ```

## 🔒 Step 4: Update CORS (2 minutes)

1. Go back to Render.com
2. Open backend service
3. Environment → Edit `FRONTEND_URL`
4. Set to: `https://uma-tyres-inventory.vercel.app`
5. Save (auto-redeploys)

## ✅ Step 5: Test (5 minutes)

Visit: `https://uma-tyres-inventory.vercel.app`

Test:
- [ ] Add a tyre
- [ ] Sell a tyre
- [ ] Check sales history
- [ ] View dashboard stats

## 🎉 Done!

**Your App**: https://uma-tyres-inventory.vercel.app  
**Backend**: https://uma-tyres-backend.onrender.com

**Total Time**: ~30 minutes  
**Total Cost**: ₹0 (FREE!)

## ⚠️ Important Notes

- First request may take 30-60 seconds (backend waking up)
- Backend sleeps after 15 min inactivity (free tier)
- All data saved in SQLite database
- Auto-deploys on every git push

## 🔄 To Update Later

```bash
# Make changes
git add .
git commit -m "Your changes"
git push
```

Both services auto-deploy! ✅
