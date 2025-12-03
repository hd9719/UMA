# 🎯 Quick Start Guide - UMA Tyres

## 🚀 Starting Your Application

### Step 1: Start Backend
Open a terminal and run:
```bash
cd /home/harsh/Documents/harsh/uma/backend
npm start
```
✅ You should see: "🚀 Server is running on http://localhost:5000"

### Step 2: Start Frontend
Open a NEW terminal and run:
```bash
cd /home/harsh/Documents/harsh/uma/frontend
npm start
```
✅ Browser will open automatically at http://localhost:3000

## � Login to the System

When you first open the application, you'll see a login screen.

**Enter these credentials:**
- **Username**: `admin`
- **Password**: `Uma@12051997`

Click **"🔐 Login"** to access the dashboard.

**Note**: These credentials are stored securely in the application. See `AUTHENTICATION.md` for details on changing them.

## �📊 Using the Dashboard

### Logout
Click the **"🚪 Logout"** button in the top-right corner of the header to logout.

### Top Statistics (Always Visible)
You'll see 4 cards showing:
- 📦 **Total Tyres in Stock** - How many tyres you have
- 💰 **Total Inventory Value** - Worth of all your tyres (in ₹)
- ⚠️ **Low Stock Items** - Tyres with less than 10 units
- 🚫 **Out of Stock** - Tyres with zero quantity

## 📦 Inventory Management Tab

### Adding Your First Tyre
1. Click green **"➕ Add New Tyre"** button
2. Fill in:
   - Brand: e.g., "MRF"
   - Model: e.g., "ZVTS"
   - Size: e.g., "185/65 R15"
   - Type: Select from dropdown (e.g., "All Season")
   - Stock Quantity: e.g., 20
   - Price: e.g., 4500
3. Click **"Add Tyre"**

### Selling a Tyre
1. Find the tyre you want to sell
2. Click the cyan **"💰 Sell"** button
3. A form will open showing:
   - Tyre details (brand, model, size)
   - Available stock
4. Enter:
   - Quantity to sell (e.g., 2)
   - Sale price (defaults to original price)
   - Customer name (optional): e.g., "Rajesh Kumar"
   - Customer phone (optional): e.g., "9876543210"
5. Click **"💰 Complete Sale"**
6. ✅ Success! Stock is reduced automatically

### Editing a Tyre
1. Click yellow **"Edit"** button on any tyre
2. Update any field
3. Click **"Update Tyre"**

### Searching for Tyres
Use the 3 filter boxes at the top:
- **Search**: Type brand, model, or size
- **Brand**: Filter by specific brand
- **Type**: Select tyre type from dropdown
- Click **"🔍 Search"** to apply
- Click **"Clear Filters"** to reset

## 💰 Sales History Tab

### Viewing All Sales
1. Click the **"💰 Sales History"** tab
2. You'll see:
   - Every sale you've made
   - Date and time of each sale
   - Customer details (if provided)
   - **Total Revenue** at the top in green

### Reversing a Sale (If Mistake)
1. Find the sale in the table
2. Click red **"Delete"** button
3. Confirm deletion
4. ✅ Sale is removed and stock is restored!

## 💡 Pro Tips

### Stock Status Colors
- 🟢 **Green Badge**: In Stock (10+ units)
- 🟡 **Yellow Badge**: Low Stock (1-9 units)
- 🔴 **Red Badge**: Out of Stock (0 units)

### Quick Workflow for Daily Use
1. **Morning**: Check dashboard for low stock alerts
2. **During Day**: Sell tyres using "💰 Sell" button
3. **Evening**: Check "💰 Sales History" for total revenue
4. **When Restocking**: Click "Edit" to update quantities

### Customer Benefits
- Track who bought what
- Phone numbers for follow-up
- Notes for special requests or warranty info

## 🔧 Troubleshooting

### "Failed to connect to server"
- Make sure backend is running (Terminal 1)
- Check it says "Server is running on http://localhost:5000"

### "Cannot sell more than available"
- Check the Available Stock shown in the sell form
- You can only sell up to that number

### Changes not appearing
- Click **"🔍 Search"** button to refresh
- Or switch tabs and come back

## 📱 Mobile Usage

The app works on mobile phones too!
- All features available
- Touch-friendly buttons
- Tables scroll sideways
- Perfect for shop floor use

## 🎓 Example Scenario

**You have a customer who wants to buy 2 MRF ZVTS tyres:**

1. Go to **📦 Inventory** tab
2. Find "MRF ZVTS" in the table
3. Check Available Stock (must be 2 or more)
4. Click **"💰 Sell"** button
5. Enter:
   - Quantity: 2
   - Sale Price: 4500 (or your selling price)
   - Customer Name: Customer's name
   - Customer Phone: Customer's number
6. Click **"💰 Complete Sale"**
7. ✅ Done! Stock reduces from 20 to 18
8. Check **💰 Sales History** to see the transaction

## 📊 Understanding Your Business

### End of Day:
- Go to **💰 Sales History**
- See **Total Revenue** at the top
- Count number of transactions
- Review customer list

### End of Week/Month:
- Check dashboard statistics
- See total inventory value
- Identify low stock items to reorder
- Plan purchases based on sales history

## 🎉 You're All Set!

Your UMA Tyres inventory system is ready to use. Start by adding your current inventory, then use it daily to track sales and manage stock!

**Questions?** Check README.md for detailed documentation.

**Happy Selling! 🚗💨**
