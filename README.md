# 🚗 UMA Tyres - Inventory Management System

A full-stack web application for managing tyre shop inventory with a modern, user-friendly interface and integrated sales tracking.

## 🌟 Features

### Security
- 🔐 **Login Authentication** - Secure login with username and password
- 🚪 **Session Management** - Stay logged in across browser sessions
- 🔒 **Protected Access** - Only authenticated users can access the system

### Inventory Management
- ✅ **Add, Edit, Delete Tyres** - Complete CRUD operations
- 🔍 **Search & Filter** - Find tyres by brand, model, size, or type
- 📊 **Stock Tracking** - Visual indicators for stock levels (In Stock, Low Stock, Out of Stock)
- 💰 **Price Management** - Track and update tyre prices
- 📈 **Real-time Statistics** - Total inventory count, total value, low stock alerts

### Sales Tracking
- 💸 **Quick Sell** - Sell tyres directly from inventory with automatic stock reduction
- 📋 **Sales History** - Complete transaction history with customer details
- � **Revenue Tracking** - Total revenue calculation across all sales
- 👥 **Customer Information** - Store customer name and phone for each sale
- ↩️ **Sale Reversal** - Delete sales and restore stock if needed

### General
- �📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🗄️ **Local Database** - SQLite for easy local deployment
- 🚀 **Easy Migration** - Ready to migrate to PostgreSQL/MySQL
- 🎨 **Modern UI** - Clean interface with UMA Tyres branding

## 🏗️ Tech Stack

### Frontend
- **React.js** - Modern UI library
- **CSS3** - Responsive styling with gradient design
- **Fetch API** - RESTful API communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Local database
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### 1. Clone or Navigate to Project
```bash
cd /path/to/tyre-inventory-management
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done)
npm install

# Initialize database
npm run init-db

# Start the server
npm start
```

The backend API will run on **http://localhost:5000**

### 3. Setup Frontend

Open a **new terminal** and run:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (already done)
npm install

# Start the React app
npm start
```

The frontend will run on **http://localhost:3000** and automatically open in your browser.

### 4. Login to Application

When you open the frontend, you'll see a login screen:

**Credentials:**
- **Username**: `admin`
- **Password**: `Uma@12051997`

Enter these credentials and click "🔐 Login" to access the system.

## 📁 Project Structure

```
tyre-inventory-management/
├── backend/
│   ├── routes/
│   │   └── tyres.js          # API routes for tyre operations
│   ├── database.js            # Database configuration & helpers
│   ├── server.js              # Express server setup
│   ├── initDatabase.js        # Database initialization script
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
│
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── TyreForm.js    # Add/Edit tyre form
│   │   │   └── TyreTable.js   # Tyre listing table
│   │   ├── services/
│   │   │   └── tyreService.js # API service layer
│   │   ├── App.js             # Main application component
│   │   ├── App.css            # Application styles
│   │   └── index.js           # React entry point
│   └── package.json           # Frontend dependencies
│
└── README.md                  # This file
```

## 🎯 Usage Guide

### Dashboard Overview
The dashboard shows key statistics at a glance:
- **Total Tyres in Stock** - Current inventory count
- **Total Inventory Value** - Total worth of all tyres (quantity × price)
- **Low Stock Items** - Tyres with less than 10 units
- **Out of Stock** - Tyres with zero quantity

### Managing Inventory (📦 Inventory Tab)

#### Adding a Tyre
1. Click the **"➕ Add New Tyre"** button
2. Fill in the tyre details:
   - Brand (e.g., Michelin, Bridgestone)
   - Model (e.g., Pilot Sport 4)
   - Size (e.g., 205/55 R16)
   - Type (All Season, Summer, Winter, etc.)
   - Stock Quantity
   - Price
   - Description (optional)
3. Click **"Add Tyre"**

#### Editing a Tyre
1. Click the **"Edit"** button on any tyre row
2. Modify the details in the form
3. Click **"Update Tyre"**

#### Selling a Tyre
1. Click the **"💰 Sell"** button on any tyre row
2. Enter sale details:
   - Quantity to sell (up to available stock)
   - Sale price (pre-filled with original price)
   - Customer name (optional)
   - Customer phone (optional)
   - Notes (optional)
3. Click **"💰 Complete Sale"**
4. Stock is automatically reduced

#### Deleting a Tyre
1. Click the **"Delete"** button on any tyre row
2. Confirm the deletion

#### Searching & Filtering
- Use the **Search** box to find tyres by brand, model, or size
- Use **Brand** filter to show only specific brands
- Use **Type** dropdown to filter by tyre type
- Click **"Search"** to apply filters
- Click **"Clear Filters"** to reset

### Viewing Sales (💰 Sales History Tab)

1. Click the **"💰 Sales History"** tab
2. View all completed sales with:
   - Sale date and time
   - Tyre details (brand, model, size)
   - Quantity sold
   - Sale price and total amount
   - Customer information
   - **Total Revenue** displayed at the top

#### Reversing a Sale
1. Click **"Delete"** on any sale record
2. Confirm deletion
3. Stock is automatically restored to inventory

## 🗄️ Database Information

### Current Setup: SQLite
- Database file: `backend/database.sqlite`
- No installation required
- Perfect for local development and small deployments

### Database Schema

#### Tyres Table
```sql
CREATE TABLE tyres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  size TEXT NOT NULL,
  type TEXT NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  price REAL NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### Sales Table
```sql
CREATE TABLE sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tyre_id INTEGER NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  size TEXT NOT NULL,
  type TEXT NOT NULL,
  quantity_sold INTEGER NOT NULL DEFAULT 1,
  sale_price REAL NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  notes TEXT,
  sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tyre_id) REFERENCES tyres(id)
)
```

## 🔄 Migrating to Remote Database

### Option 1: PostgreSQL (Recommended for Production)

1. **Install PostgreSQL adapter:**
```bash
cd backend
npm install pg
```

2. **Update `backend/database.js`:**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});
```

3. **Update `.env` file:**
```env
DB_TYPE=postgres
POSTGRES_HOST=your-db-host.com
POSTGRES_PORT=5432
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=tyre_inventory
```

4. **Free PostgreSQL hosting options:**
   - [Neon](https://neon.tech/) - Free tier with 0.5GB storage
   - [Supabase](https://supabase.com/) - Free tier with 500MB database
   - [ElephantSQL](https://www.elephantsql.com/) - Free tier with 20MB storage

### Option 2: MySQL

1. **Install MySQL adapter:**
```bash
cd backend
npm install mysql2
```

2. **Update database configuration similarly**

3. **Free MySQL hosting:**
   - [PlanetScale](https://planetscale.com/) - Free tier with 5GB storage
   - [Aiven](https://aiven.io/) - Free tier available

## 🌐 Deployment Options

### Backend Deployment (Free Tiers)

1. **[Render](https://render.com/)** ✅ Recommended
   - Free tier available
   - Automatic deployments from Git
   - Built-in PostgreSQL support

2. **[Railway](https://railway.app/)**
   - $5 free credit monthly
   - Easy PostgreSQL setup

3. **[Fly.io](https://fly.io/)**
   - Free tier with limitations
   - Global deployment

### Frontend Deployment (Free Tiers)

1. **[Vercel](https://vercel.com/)** ✅ Recommended
   - Perfect for React apps
   - Automatic deployments
   - Free SSL

2. **[Netlify](https://www.netlify.com/)**
   - Easy drag-and-drop deployment
   - Free tier available

3. **[GitHub Pages](https://pages.github.com/)**
   - Free static hosting
   - Requires React build configuration

### Deployment Steps

#### Backend on Render:
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables
7. Deploy!

#### Frontend on Vercel:
1. Push code to GitHub
2. Import project on Vercel
3. Set root directory to `frontend`
4. Update API URL in `frontend/src/services/tyreService.js`
5. Deploy!

## 🔧 API Endpoints

### Base URL: `http://localhost:5000/api`

### Tyres Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tyres` | Get all tyres (with optional filters) |
| GET | `/tyres/:id` | Get single tyre by ID |
| POST | `/tyres` | Create new tyre |
| PUT | `/tyres/:id` | Update tyre |
| DELETE | `/tyres/:id` | Delete tyre |
| GET | `/tyres/filters/brands` | Get all unique brands |
| GET | `/tyres/filters/types` | Get all unique types |

### Sales Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/sales` | Get all sales (with optional filters) |
| GET | `/sales/:id` | Get single sale by ID |
| POST | `/sales` | Record a new sale (auto-reduces stock) |
| DELETE | `/sales/:id` | Delete sale (restores stock) |
| GET | `/sales/stats/summary` | Get sales statistics |

### Other Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |

### Example API Requests

**Get all tyres:**
```bash
curl http://localhost:5000/api/tyres
```

**Add a tyre:**
```bash
curl -X POST http://localhost:5000/api/tyres \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Michelin",
    "model": "Pilot Sport 4",
    "size": "225/45 R17",
    "type": "Performance",
    "stock_quantity": 15,
    "price": 8500,
    "description": "High-performance summer tyre"
  }'
```

## 🛠️ Development

### Backend Development Mode (with auto-restart):
```bash
cd backend
npm run dev
```

### Testing the API:
```bash
# Health check
curl http://localhost:5000/api/health

# Get all tyres
curl http://localhost:5000/api/tyres
```

## 📝 Environment Variables

### Backend (`.env`)
```env
PORT=5000
DATABASE_PATH=./database.sqlite
NODE_ENV=development
```

### Frontend
Update `REACT_APP_API_URL` in `src/services/tyreService.js` when deploying:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

## 🐛 Troubleshooting

### Backend not starting?
- Ensure port 5000 is not in use: `lsof -i :5000`
- Check Node.js is installed: `node --version`
- Verify all dependencies: `cd backend && npm install`

### Frontend not connecting to backend?
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API URL in `tyreService.js`

### Database errors?
- Run database initialization: `npm run init-db`
- Check database file exists: `ls backend/database.sqlite`
- Verify SQLite3 is installed correctly

## 📊 Sample Data

To add sample data for testing:

```bash
cd backend
node -e "
const { tyreService } = require('./database');
// Add sample tyres using API endpoints
"
```

Or use the UI to add tyres manually!

## 🤝 Contributing

This is a personal business tool, but feel free to:
- Report bugs
- Suggest features
- Improve documentation

## 📄 License

ISC - Free to use and modify for your business needs.

## 🎉 Credits

Built with ❤️ for efficient tyre shop management.

---

## 🚀 Next Steps

1. ✅ Start both servers (backend and frontend)
2. ✅ Add your first tyre to the inventory
3. ✅ Test search and filter functionality
4. 📈 When ready, migrate to remote database
5. 🌐 Deploy to free hosting platforms

**Happy Tyre Managing! 🚗🔧**

---

## 🌐 Deploy to Production (FREE!)

Your app is ready to deploy for FREE using:
- **Backend**: Render.com (Free tier)
- **Frontend**: Vercel (Free tier)
- **Total Cost**: ₹0

### Quick Deploy:
See `DEPLOY_NOW.md` for one-page guide (30 minutes)

### Detailed Guides:
- 📋 `DEPLOY_CHECKLIST.md` - Step-by-step checklist
- 📖 `DEPLOY_GUIDE.md` - Complete deployment guide
- 🗺️ `DEPLOYMENT_ROADMAP.md` - Visual overview

### After Deployment:
- ✅ Access from anywhere
- ✅ Share with your team
- ✅ HTTPS secured
- ✅ Auto-deploys on push
- ✅ FREE forever!
