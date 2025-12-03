const express = require('express');
const router = express.Router();
const { runQuery, getAllRows, getRow } = require('../database');

// Get all tyres with optional search and filter
router.get('/', async (req, res) => {
  try {
    const { search, brand, type, sortBy = 'id', order = 'ASC' } = req.query;
    
    let query = 'SELECT * FROM tyres WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (brand LIKE ? OR model LIKE ? OR size LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (brand) {
      query += ' AND brand = ?';
      params.push(brand);
    }

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    const tyres = await getAllRows(query, params);
    res.json({ success: true, data: tyres, count: tyres.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single tyre by ID
router.get('/:id', async (req, res) => {
  try {
    const tyre = await getRow('SELECT * FROM tyres WHERE id = ?', [req.params.id]);
    
    if (!tyre) {
      return res.status(404).json({ success: false, error: 'Tyre not found' });
    }

    res.json({ success: true, data: tyre });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new tyre
router.post('/', async (req, res) => {
  try {
    const { brand, model, size, type, stock_quantity, price, description } = req.body;

    if (!brand || !model || !size || !type || price === undefined) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: brand, model, size, type, price' 
      });
    }

    const query = `
      INSERT INTO tyres (brand, model, size, type, stock_quantity, price, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await runQuery(query, [
      brand, 
      model, 
      size, 
      type, 
      stock_quantity || 0, 
      price, 
      description || ''
    ]);

    res.status(201).json({ 
      success: true, 
      data: { id: result.lastID },
      message: 'Tyre added successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update a tyre
router.put('/:id', async (req, res) => {
  try {
    const { brand, model, size, type, stock_quantity, price, description } = req.body;
    const { id } = req.params;

    const existingTyre = await getRow('SELECT * FROM tyres WHERE id = ?', [id]);
    
    if (!existingTyre) {
      return res.status(404).json({ success: false, error: 'Tyre not found' });
    }

    const query = `
      UPDATE tyres 
      SET brand = ?, model = ?, size = ?, type = ?, 
          stock_quantity = ?, price = ?, description = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    await runQuery(query, [
      brand || existingTyre.brand,
      model || existingTyre.model,
      size || existingTyre.size,
      type || existingTyre.type,
      stock_quantity !== undefined ? stock_quantity : existingTyre.stock_quantity,
      price !== undefined ? price : existingTyre.price,
      description !== undefined ? description : existingTyre.description,
      id
    ]);

    res.json({ success: true, message: 'Tyre updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a tyre
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existingTyre = await getRow('SELECT * FROM tyres WHERE id = ?', [id]);
    
    if (!existingTyre) {
      return res.status(404).json({ success: false, error: 'Tyre not found' });
    }

    await runQuery('DELETE FROM tyres WHERE id = ?', [id]);

    res.json({ success: true, message: 'Tyre deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get distinct brands (for filter dropdown)
router.get('/filters/brands', async (req, res) => {
  try {
    const brands = await getAllRows('SELECT DISTINCT brand FROM tyres ORDER BY brand');
    res.json({ success: true, data: brands.map(b => b.brand) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get distinct types (for filter dropdown)
router.get('/filters/types', async (req, res) => {
  try {
    const types = await getAllRows('SELECT DISTINCT type FROM tyres ORDER BY type');
    res.json({ success: true, data: types.map(t => t.type) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
