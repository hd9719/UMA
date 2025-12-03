import React from 'react';

const SalesTable = ({ sales, onDelete }) => {
  if (sales.length === 0) {
    return (
      <div className="no-data">
        <p>No sales recorded yet. Start selling tyres to see them here!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Size</th>
          <th>Qty</th>
          <th>Price (₹)</th>
          <th>Total (₹)</th>
          <th>Customer</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale) => (
          <tr key={sale.id}>
            <td>{sale.id}</td>
            <td>{formatDate(sale.sale_date)}</td>
            <td><strong>{sale.brand}</strong></td>
            <td>{sale.model}</td>
            <td>{sale.size}</td>
            <td>{sale.quantity_sold}</td>
            <td>₹{parseFloat(sale.sale_price).toFixed(2)}</td>
            <td><strong>₹{(parseFloat(sale.sale_price) * sale.quantity_sold).toFixed(2)}</strong></td>
            <td>{sale.customer_name || '-'}</td>
            <td>
              <div className="actions">
                <button 
                  onClick={() => onDelete(sale.id)} 
                  className="btn-danger"
                  title="Delete sale and restore stock"
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

export default SalesTable;
