import React, { useState } from 'react';
import TyreSizeDropdown from './TyreSizeDropdown';

const SellForm = ({ tyre, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    quantity_sold: 1,
    sale_price: tyre?.price || 0,
    size: tyre?.size || '',
    customer_name: '',
    customer_phone: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeSelect = (size) => {
    setFormData({ ...formData, size });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const totalAmount = formData.sale_price * formData.quantity_sold;

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ 
        background: '#f8f9fa', 
        padding: '1rem', 
        borderRadius: '6px', 
        marginBottom: '1.5rem' 
      }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Tyre Details</h3>
        <p><strong>Brand:</strong> {tyre.brand}</p>
        <p><strong>Model:</strong> {tyre.model}</p>
        <p><strong>Size:</strong> {tyre.size}</p>
        <p><strong>Available Stock:</strong> {tyre.stock_quantity} units</p>
        <p><strong>Original Price:</strong> ₹{parseFloat(tyre.price).toFixed(2)}</p>
      </div>

      <div className="form-group">
        <label>Quantity to Sell *</label>
        <input
          type="number"
          name="quantity_sold"
          value={formData.quantity_sold}
          onChange={handleChange}
          required
          min="1"
          max={tyre.stock_quantity}
        />
        <small style={{ color: '#666' }}>Max: {tyre.stock_quantity} units available</small>
      </div>

      <div className="form-group">
        <label>Sale Price (₹) *</label>
        <input
          type="number"
          name="sale_price"
          value={formData.sale_price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="size">Tyre Size</label>
        <TyreSizeDropdown onSelectSize={handleSizeSelect} />
      </div>

      <div style={{ 
        background: '#d4edda', 
        padding: '1rem', 
        borderRadius: '6px', 
        marginBottom: '1.5rem',
        border: '1px solid #c3e6cb'
      }}>
        <h3 style={{ color: '#155724', marginBottom: '0.5rem' }}>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      </div>

      <div className="form-group">
        <label>Customer Name</label>
        <input
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
          placeholder="Optional"
        />
      </div>

      <div className="form-group">
        <label>Customer Phone</label>
        <input
          type="tel"
          name="customer_phone"
          value={formData.customer_phone}
          onChange={handleChange}
          placeholder="Optional"
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional notes..."
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-success">
          💰 Complete Sale
        </button>
      </div>
    </form>
  );
};

export default SellForm;
