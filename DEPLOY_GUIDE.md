# 🚀 Deploy UMA Tyres - Step by Step Guide

This guide will help you deploy your UMA Tyres application for FREE using Render (backend) and Vercel (frontend).

## 📋 What You'll Need

1. GitHub account (free)
2. Render.com account (free)
3. Vercel.com account (free)
4. 30 minutes of your time

## 🎯 Deployment Overview

- **Backend** → Render.com (FREE tier with 512MB RAM)
- **Frontend** → Vercel (FREE tier with 100GB bandwidth)
- **Database** → SQLite (included with backend)
- **Total Cost** → ₹0 (FREE!)

---

## Part 1: Push Code to GitHub

### Step 1: Initialize Git (if not already done)

```bash
cd /home/harsh/Documents/harsh/uma

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - UMA Tyres Inventory System"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click **"+"** → **"New repository"**
3. Name it: `uma-tyres-inventory`
4. Keep it **Private** (or Public, your choice)
5. **Don't** add README, .gitignore, or license (we already have them)
6. Click **"Create repository"**

### Step 3: Push to GitHub

```bash
# Replace YOUR-USERNAME with your GitHub username
git remote add origin https://github.com/YOUR-USERNAME/uma-tyres-inventory.git

# Push code
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

## Part 2: Deploy Backend to Render.com

### Step 1: Create Render Account

1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with your GitHub account (easiest)
4. Authorize Render to access your repositories

### Step 2: Create Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - Find `uma-tyres-inventory`
   - Click **"Connect"**

### Step 3: Configure Backend Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `uma-tyres-backend` (or any name you like)
- **Region**: Singapore (closest to India)
- **Branch**: `main`
- **Root Directory**: `backend`

**Build & Deploy:**
- **Runtime**: `Node`
- **Build Command**: 
  ```
  npm install && npm run init-db
  ```
- **Start Command**: 
  ```
  npm start
  ```

**Instance Type:**
- Select **"Free"** (512 MB RAM, $0/month)

### Step 4: Add Environment Variables

Scroll down to **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `DATABASE_PATH` | `./database.sqlite` |
| `FRONTEND_URL` | `*` (we'll update this later) |

### Step 5: Deploy!

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Render will:
   - Install dependencies
   - Initialize database
   - Start the server

### Step 6: Get Your Backend URL

Once deployed, you'll see:
- ✅ **"Live"** status (green)
- Your URL: `https://uma-tyres-backend.onrender.com`

**Copy this URL!** You'll need it for the frontend.

### Step 7: Test Your Backend

Click on your backend URL and add `/api/health`:
```
https://uma-tyres-backend.onrender.com/api/health
```

You should see:
```json
{
  "success": true,
  "message": "Tyre Inventory API is running",
  "timestamp": "..."
}
```

✅ Backend is live!

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Update Frontend API URL

1. Open `/home/harsh/Documents/harsh/uma/frontend/.env.production`
2. Replace with your Render backend URL:
   ```
   REACT_APP_API_URL=https://uma-tyres-backend.onrender.com/api
   ```
3. Save the file

### Step 2: Push Update to GitHub

```bash
cd /home/harsh/Documents/harsh/uma

git add frontend/.env.production
git commit -m "Update production API URL"
git push
```

### Step 3: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### Step 4: Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your Git repository:
   - Find `uma-tyres-inventory`
   - Click **"Import"**

### Step 5: Configure Frontend

**Framework Preset:**
- Vercel auto-detects: `Create React App` ✅

**Root Directory:**
- Click **"Edit"**
- Select: `frontend`

**Build Settings:** (auto-filled, verify)
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

**Environment Variables:**
- Key: `REACT_APP_API_URL`
- Value: `https://uma-tyres-backend.onrender.com/api`
- Click **"Add"**

### Step 6: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Vercel will:
   - Install dependencies
   - Build React app
   - Deploy to CDN

### Step 7: Get Your Frontend URL

Once deployed, you'll see:
- ✅ **Congratulations!**
- Your URL: `https://uma-tyres-inventory.vercel.app`

Click **"Visit"** to open your live app!

---

## Part 4: Update Backend CORS

Now that you have your frontend URL, update backend environment:

1. Go back to Render.com
2. Open your backend service
3. Go to **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Update to: `https://uma-tyres-inventory.vercel.app`
6. Click **"Save Changes"**
7. Service will auto-redeploy (1-2 minutes)

✅ CORS is now properly configured!

---

## 🎉 Testing Your Deployed App

### 1. Open Your Frontend URL
```
https://uma-tyres-inventory.vercel.app
```

### 2. Test All Features

**✅ Inventory Management:**
- Add a tyre
- Edit a tyre
- Delete a tyre
- Search and filter

**✅ Sales Tracking:**
- Sell a tyre
- Check stock reduction
- View sales history
- Check total revenue

**✅ Dashboard:**
- Verify statistics update
- Check total inventory value
- See low stock alerts

---

## 🔒 Important Notes

### Free Tier Limitations

**Render.com (Backend):**
- ⚠️ **Spins down after 15 minutes of inactivity**
- First request after idle: 30-60 seconds delay
- 512 MB RAM (sufficient for your app)
- 750 hours/month free (enough for 24/7)

**Vercel (Frontend):**
- ✅ Always fast (no spin-down)
- 100 GB bandwidth/month
- Unlimited deployments
- Global CDN

### Database Persistence

- SQLite database is stored on Render's disk
- ⚠️ **Data may be lost if service is deleted**
- For production, consider upgrading to PostgreSQL
- Render offers PostgreSQL free tier (256MB)

---

## 📱 Share Your App

Your app is now live! Share these URLs:

**For Users:**
```
https://uma-tyres-inventory.vercel.app
```

**API Documentation:**
```
https://uma-tyres-backend.onrender.com/api
```

---

## 🔄 Updating Your App

When you make changes:

```bash
cd /home/harsh/Documents/harsh/uma

# Make your changes
# Then commit and push

git add .
git commit -m "Description of changes"
git push
```

**Auto-deployment:**
- Vercel: Deploys automatically on push ✅
- Render: Deploys automatically on push ✅

Both will update within 2-3 minutes!

---

## 🐛 Troubleshooting

### Backend Issues

**"Service Unavailable"**
- First request after idle takes 30-60 seconds
- Wait and refresh

**"Database not initialized"**
- Go to Render dashboard
- Click "Manual Deploy" → "Clear build cache & deploy"

**"CORS Error"**
- Check `FRONTEND_URL` environment variable
- Make sure it matches your Vercel URL exactly

### Frontend Issues

**"Failed to fetch"**
- Check backend URL in `.env.production`
- Make sure backend is awake (visit health endpoint)

**Changes not appearing**
- Clear browser cache
- Force refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

---

## 💰 Upgrading (Optional - Paid)

If your business grows:

**Render (Backend):**
- **Starter**: $7/month - No spin down, faster, 512MB RAM
- **Standard**: $25/month - 2GB RAM, better performance

**Database:**
- **Render PostgreSQL**: Free tier (256MB) or $7/month (1GB)
- **Neon**: Free tier (0.5GB) with better performance

**Vercel (Frontend):**
- **Pro**: $20/month - More bandwidth, better analytics

---

## 📊 Monitoring Your App

### Free Monitoring Tools

1. **Uptimerobot** (https://uptimerobot.com)
   - Free monitoring
   - Pings your app every 5 minutes
   - Keeps backend awake!
   - Email alerts

2. **Render Dashboard**
   - View logs
   - Check resource usage
   - Monitor deployments

3. **Vercel Analytics**
   - Page views
   - Performance metrics
   - Visitor locations

---

## 🎯 Custom Domain (Optional)

Want your own domain like `uma-tyres.com`?

**For Frontend:**
1. Buy domain from Namecheap/GoDaddy (~$10/year)
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records (Vercel provides instructions)

**For Backend:**
1. Similar process in Render
2. Or keep the `.onrender.com` subdomain

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Frontend `.env.production` updated
- [ ] Frontend pushed to GitHub
- [ ] Frontend deployed on Vercel
- [ ] Frontend URL copied
- [ ] Backend CORS updated with frontend URL
- [ ] Tested: Add tyre
- [ ] Tested: Sell tyre
- [ ] Tested: View sales history
- [ ] Tested: Dashboard statistics
- [ ] Shared URL with team/customers

---

## 🎉 Congratulations!

Your UMA Tyres Inventory Management System is now LIVE and accessible worldwide!

**Your URLs:**
- 🌐 **App**: https://uma-tyres-inventory.vercel.app
- 🔧 **API**: https://uma-tyres-backend.onrender.com

**Cost**: ₹0 (FREE!)

---

## 📞 Need Help?

If you encounter any issues:

1. Check the troubleshooting section above
2. Review Render/Vercel logs for errors
3. Verify environment variables are correct
4. Test backend health endpoint first
5. Check browser console for frontend errors

**Common First-Time Issues:**
- Waiting for backend to wake up (30-60 seconds)
- Incorrect API URL in frontend
- CORS not configured with correct frontend URL

---

## 🚀 Next Steps

Now that your app is live:

1. **Add your inventory** - Start with your current stock
2. **Train your team** - Show them how to use it
3. **Set up monitoring** - Use Uptimerobot
4. **Take daily backups** - Export sales data
5. **Monitor usage** - Check Render/Vercel dashboards

**Your business now has a professional, cloud-based inventory system! 🎉**
