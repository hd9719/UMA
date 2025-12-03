# 🚀 Deployment Guide for Tyre Inventory System

This guide will help you deploy your tyre inventory application to free hosting platforms.

## 📋 Prerequisites

- GitHub account
- Code pushed to a GitHub repository

## 🔧 Backend Deployment (Render.com - FREE)

### Step 1: Prepare Backend for Deployment

1. Create `backend/.env.example`:
```env
PORT=5000
DATABASE_PATH=./database.sqlite
NODE_ENV=production
```

2. Ensure `backend/package.json` has the correct start script:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `tyre-inventory-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run init-db`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `DATABASE_PATH`: ./database.sqlite

6. Click **"Create Web Service"**

7. Note your backend URL (e.g., `https://tyre-inventory-api.onrender.com`)

⚠️ **Important**: Free tier on Render spins down after inactivity. First request may take 30-60 seconds.

## 🎨 Frontend Deployment (Vercel - FREE)

### Step 1: Update API URL

Update `frontend/src/services/tyreService.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://YOUR-BACKEND-URL.onrender.com/api';
```

Replace `YOUR-BACKEND-URL` with your actual Render backend URL.

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. Add Environment Variable:
   - `REACT_APP_API_URL`: `https://your-backend-url.onrender.com/api`

6. Click **"Deploy"**

7. Your app will be live at: `https://your-app.vercel.app`

## 🗄️ Database Migration (Optional - PostgreSQL)

### Free PostgreSQL Options:

#### Option 1: Neon (Recommended)
- [neon.tech](https://neon.tech)
- Free tier: 0.5GB storage
- Serverless PostgreSQL

#### Option 2: Supabase
- [supabase.com](https://supabase.com)
- Free tier: 500MB database
- Includes authentication & storage

### Migration Steps:

1. **Create PostgreSQL database** on chosen platform

2. **Install pg package**:
```bash
cd backend
npm install pg
```

3. **Update `backend/database.js`** to support both SQLite and PostgreSQL:
```javascript
const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');
require('dotenv').config();

const DB_TYPE = process.env.DB_TYPE || 'sqlite';

let db, pool;

if (DB_TYPE === 'postgres') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  // PostgreSQL helper functions
  const runQuery = async (query, params = []) => {
    const client = await pool.connect();
    try {
      const result = await client.query(query, params);
      return result;
    } finally {
      client.release();
    }
  };
  
  // ... implement other helpers for PostgreSQL
} else {
  // SQLite code (existing)
}

module.exports = { db, pool, runQuery, getAllRows, getRow, initDatabase };
```

4. **Update environment variables** on Render:
   - `DB_TYPE`: `postgres`
   - `DATABASE_URL`: Your PostgreSQL connection string

5. **Re-deploy** your backend

## 🔒 Security Best Practices

### Backend Security

1. **Add rate limiting** to prevent abuse:
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

2. **Add helmet** for security headers:
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

3. **Environment variables**: Never commit `.env` files

### Frontend Security

1. **Environment variables**: Use `.env.production` for production API URLs
2. **API key protection**: Never expose API keys in frontend code

## 📊 Monitoring & Maintenance

### Free Monitoring Tools

1. **Uptime monitoring**: [UptimeRobot](https://uptimerobot.com) - Free
2. **Error tracking**: [Sentry](https://sentry.io) - Free tier available
3. **Analytics**: [Google Analytics](https://analytics.google.com) - Free

### Backup Strategy

For SQLite (local):
- Regular backups of `database.sqlite` file
- Store backups in cloud storage (Google Drive, Dropbox)

For PostgreSQL (remote):
- Most providers include automated backups
- Export data periodically: `pg_dump`

## 🚨 Troubleshooting

### Backend won't start on Render
- Check build logs in Render dashboard
- Verify `package.json` scripts are correct
- Ensure all dependencies are in `dependencies`, not `devDependencies`

### Frontend can't connect to backend
- Verify CORS is enabled in backend
- Check API URL is correct in `tyreService.js`
- Look at browser console for detailed errors

### Database connection issues
- Verify connection string is correct
- Check firewall rules allow connections
- Ensure SSL settings match provider requirements

## 🎯 Cost Optimization

All free tiers should be sufficient for small businesses:

| Service | Free Tier Limits | Upgrade Cost |
|---------|-----------------|--------------|
| Render (Backend) | 750 hours/month, 0.5GB RAM | $7/month |
| Vercel (Frontend) | 100GB bandwidth | $20/month |
| Neon (Database) | 0.5GB storage | $19/month |

### Tips to stay in free tier:
- Keep backend database small (SQLite or minimal PostgreSQL)
- Optimize images and assets
- Use lazy loading for data
- Implement pagination for large datasets

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Database initialized
- [ ] Backend URL noted
- [ ] Frontend updated with backend URL
- [ ] Frontend deployed on Vercel
- [ ] Tested adding/editing/deleting tyres
- [ ] Tested search and filter features
- [ ] Set up uptime monitoring
- [ ] Created backup strategy

---

**Congratulations! Your tyre inventory system is now live! 🎉**

For support or questions, refer to the main README.md file.
