const express = require('express');
const router = express.Router();
const { runQuery, getAllRows, getRow } = require('../database');

// Get all sales with optional filters
router.get('/', async (req, res) => {
  try {
    const { search, startDate, endDate, sortBy = 'sale_date', order = 'DESC' } = req.query;
    
    let query = 'SELECT * FROM sales WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (brand LIKE ? OR model LIKE ? OR size LIKE ? OR customer_name LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (startDate) {
      query += ' AND date(sale_date) >= date(?)';
      params.push(startDate);
    }

    if (endDate) {
      query += ' AND date(sale_date) <= date(?)';
      params.push(endDate);
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    const sales = await getAllRows(query, params);
    
    // Calculate total revenue
    const totalRevenue = sales.reduce((sum, sale) => sum + (sale.sale_price * sale.quantity_sold), 0);
    
    res.json({ 
      success: true, 
      data: sales, 
      count: sales.length,
      totalRevenue: totalRevenue
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single sale by ID
router.get('/:id', async (req, res) => {
  try {
    const sale = await getRow('SELECT * FROM sales WHERE id = ?', [req.params.id]);
    
    if (!sale) {
      return res.status(404).json({ success: false, error: 'Sale not found' });
    }

    res.json({ success: true, data: sale });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Record a new sale (and update tyre stock)
router.post('/', async (req, res) => {
  try {
    const { 
      tyre_id, 
      quantity_sold = 1, 
      sale_price,
      customer_name = '',
      customer_phone = '',
      notes = ''
    } = req.body;

    if (!tyre_id || !sale_price) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: tyre_id, sale_price' 
      });
    }

    // Get tyre details
    const tyre = await getRow('SELECT * FROM tyres WHERE id = ?', [tyre_id]);
    
    if (!tyre) {
      return res.status(404).json({ success: false, error: 'Tyre not found' });
    }

    // Check if enough stock available
    if (tyre.stock_quantity < quantity_sold) {
      return res.status(400).json({ 
        success: false, 
        error: `Insufficient stock. Available: ${tyre.stock_quantity}, Requested: ${quantity_sold}` 
      });
    }

    // Insert sale record
    const saleQuery = `
      INSERT INTO sales (tyre_id, brand, model, size, type, quantity_sold, sale_price, customer_name, customer_phone, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const saleResult = await runQuery(saleQuery, [
      tyre_id,
      tyre.brand,
      tyre.model,
      tyre.size,
      tyre.type,
      quantity_sold,
      sale_price,
      customer_name,
      customer_phone,
      notes
    ]);

    // Update tyre stock
    const newStock = tyre.stock_quantity - quantity_sold;
    await runQuery(
      'UPDATE tyres SET stock_quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [newStock, tyre_id]
    );

    res.status(201).json({ 
      success: true, 
      data: { 
        id: saleResult.lastID,
        newStock: newStock
      },
      message: 'Sale recorded successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a sale (and restore tyre stock)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await getRow('SELECT * FROM sales WHERE id = ?', [id]);
    
    if (!sale) {
      return res.status(404).json({ success: false, error: 'Sale not found' });
    }

    // Restore stock
    const tyre = await getRow('SELECT * FROM tyres WHERE id = ?', [sale.tyre_id]);
    if (tyre) {
      const newStock = tyre.stock_quantity + sale.quantity_sold;
      await runQuery(
        'UPDATE tyres SET stock_quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [newStock, sale.tyre_id]
      );
    }

    // Delete sale
    await runQuery('DELETE FROM sales WHERE id = ?', [id]);

    res.json({ success: true, message: 'Sale deleted and stock restored' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get sales statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = {};
    
    // Total sales count
    const countResult = await getRow('SELECT COUNT(*) as total FROM sales');
    stats.totalSales = countResult.total;
    
    // Total revenue
    const revenueResult = await getRow('SELECT SUM(sale_price * quantity_sold) as revenue FROM sales');
    stats.totalRevenue = revenueResult.revenue || 0;
    
    // Total tyres sold
    const tyresSoldResult = await getRow('SELECT SUM(quantity_sold) as total FROM sales');
    stats.totalTyresSold = tyresSoldResult.total || 0;
    
    // Today's sales
    const todayResult = await getRow(
      'SELECT COUNT(*) as count, SUM(sale_price * quantity_sold) as revenue FROM sales WHERE date(sale_date) = date("now")'
    );
    stats.todaySales = todayResult.count;
    stats.todayRevenue = todayResult.revenue || 0;
    
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
