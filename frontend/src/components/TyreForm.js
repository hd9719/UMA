import React, { useState } from 'react';
import TyreSizeDropdown from './TyreSizeDropdown';

const TyreForm = ({ tyre, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    brand: tyre?.brand || '',
    model: tyre?.model || '',
    size: tyre?.size || '',
    type: tyre?.type || 'All Season',
    stock_quantity: tyre?.stock_quantity || 0,
    price: tyre?.price || 0,
    description: tyre?.description || '',
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Brand *</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
          placeholder="e.g., Michelin, Bridgestone"
        />
      </div>

      <div className="form-group">
        <label>Model *</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
          placeholder="e.g., Pilot Sport 4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="size">Tyre Size</label>
        <TyreSizeDropdown onSelectSize={handleSizeSelect} />
      </div>

      <div className="form-group">
        <label>Type *</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="All Season">All Season</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Performance">Performance</option>
          <option value="Off-Road">Off-Road</option>
          <option value="Touring">Touring</option>
        </select>
      </div>

      <div className="form-group">
        <label>Stock Quantity *</label>
        <input
          type="number"
          name="stock_quantity"
          value={formData.stock_quantity}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Price (₹) *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Additional details about the tyre..."
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-success">
          {tyre ? 'Update Tyre' : 'Add Tyre'}
        </button>
      </div>
    </form>
  );
};

export default TyreForm;
