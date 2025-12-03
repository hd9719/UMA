import React from 'react';

const TyreTable = ({ tyres, onEdit, onDelete, onSell }) => {
  const getStockClass = (quantity) => {
    if (quantity === 0) return 'stock-low';
    if (quantity < 10) return 'stock-medium';
    return 'stock-high';
  };

  const getStockLabel = (quantity) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'In Stock';
  };

  if (tyres.length === 0) {
    return (
      <div className="no-data">
        <p>No tyres found. Add your first tyre to get started!</p>
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Size</th>
          <th>Type</th>
          <th>Stock</th>
          <th>Price (₹)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tyres.map((tyre) => (
          <tr key={tyre.id}>
            <td>{tyre.id}</td>
            <td><strong>{tyre.brand}</strong></td>
            <td>{tyre.model}</td>
            <td>{tyre.size}</td>
            <td>{tyre.type}</td>
            <td>
              <span className={`stock-badge ${getStockClass(tyre.stock_quantity)}`}>
                {tyre.stock_quantity} - {getStockLabel(tyre.stock_quantity)}
              </span>
            </td>
            <td>₹{parseFloat(tyre.price).toFixed(2)}</td>
            <td>
              <div className="actions">
                <button 
                  onClick={() => onSell(tyre)} 
                  className="btn-sell"
                  disabled={tyre.stock_quantity === 0}
                  title={tyre.stock_quantity === 0 ? 'Out of stock' : 'Sell this tyre'}
                >
                  💰 Sell
                </button>
                <button 
                  onClick={() => onEdit(tyre)} 
                  className="btn-warning"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(tyre.id)} 
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TyreTable;
