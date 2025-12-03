import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import TyreTable from './components/TyreTable';
import TyreForm from './components/TyreForm';
import SalesTable from './components/SalesTable';
import SellForm from './components/SellForm';
import TyreSizeDropdown from './components/TyreSizeDropdown';
import { tyreService, salesService } from './services/tyreService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');
  const [tyres, setTyres] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'sell'
  const [editingTyre, setEditingTyre] = useState(null);
  const [sellingTyre, setSellingTyre] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    type: '',
    size: '',
  });
  const [stats, setStats] = useState({
    totalItems: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0
  });

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('uma_tyres_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load data on component mount and tab change
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'inventory') {
        loadTyres();
      } else if (activeTab === 'sales') {
        loadSales();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isAuthenticated]);

  const loadTyres = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tyreService.getAllTyres(filters);
      
      if (response.success) {
        setTyres(response.data);
        calculateStats(response.data);
      } else {
        setError(response.error || 'Failed to load tyres');
      }
    } catch (err) {
      setError('Failed to connect to server. Please ensure the backend is running.');
      console.error('Error loading tyres:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSales = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await salesService.getAllSales();
      
      if (response.success) {
        setSales(response.data);
      } else {
        setError(response.error || 'Failed to load sales');
      }
    } catch (err) {
      setError('Failed to connect to server.');
      console.error('Error loading sales:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (tyresData) => {
    const totalItems = tyresData.reduce((sum, tyre) => sum + tyre.stock_quantity, 0);
    const totalValue = tyresData.reduce((sum, tyre) => sum + (tyre.stock_quantity * tyre.price), 0);
    const lowStock = tyresData.filter(tyre => tyre.stock_quantity > 0 && tyre.stock_quantity < 10).length;
    const outOfStock = tyresData.filter(tyre => tyre.stock_quantity === 0).length;

    setStats({ totalItems, totalValue, lowStock, outOfStock });
  };

  const handleSearch = () => {
    loadTyres();
  };

  const handleClearFilters = () => {
    setFilters({ search: '', brand: '', type: '', size: '' });
    setTimeout(loadTyres, 100);
  };

  const handleAddTyre = () => {
    setEditingTyre(null);
    setModalType('add');
    setShowModal(true);
  };

  const handleEditTyre = (tyre) => {
    setEditingTyre(tyre);
    setModalType('edit');
    setShowModal(true);
  };

  const handleSellTyre = (tyre) => {
    setSellingTyre(tyre);
    setModalType('sell');
    setShowModal(true);
  };

  const handleDeleteTyre = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tyre?')) {
      return;
    }

    try {
      const response = await tyreService.deleteTyre(id);
      
      if (response.success) {
        setSuccess('Tyre deleted successfully!');
        loadTyres();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(response.error || 'Failed to delete tyre');
      }
    } catch (err) {
      setError('Failed to delete tyre');
      console.error('Error deleting tyre:', err);
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      let response;
      
      if (editingTyre) {
        response = await tyreService.updateTyre(editingTyre.id, formData);
      } else {
        response = await tyreService.createTyre(formData);
      }

      if (response.success) {
        setSuccess(editingTyre ? 'Tyre updated successfully!' : 'Tyre added successfully!');
        setShowModal(false);
        loadTyres();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(response.error || 'Failed to save tyre');
      }
    } catch (err) {
      setError('Failed to save tyre');
      console.error('Error saving tyre:', err);
    }
  };

  const handleSubmitSale = async (saleData) => {
    try {
      const response = await salesService.recordSale(saleData);

      if (response.success) {
        setSuccess(`Sale recorded successfully! New stock: ${response.data.newStock}`);
        setShowModal(false);
        loadTyres();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(response.error || 'Failed to record sale');
      }
    } catch (err) {
      setError('Failed to record sale');
      console.error('Error recording sale:', err);
    }
  };

  const handleDeleteSale = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sale? Stock will be restored.')) {
      return;
    }

    try {
      const response = await salesService.deleteSale(id);
      
      if (response.success) {
        setSuccess('Sale deleted and stock restored!');
        loadSales();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(response.error || 'Failed to delete sale');
      }
    } catch (err) {
      setError('Failed to delete sale');
      console.error('Error deleting sale:', err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeFilter = (size) => {
    setFilters({ ...filters, size });
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    loadTyres();
  };

  const handleLogout = () => {
    localStorage.removeItem('uma_tyres_auth');
    localStorage.removeItem('uma_tyres_user');
    setIsAuthenticated(false);
    setTyres([]);
    setSales([]);
    setActiveTab('inventory');
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <div>
            <h1>🚗 UMA Tyres - Inventory Management</h1>
            <p>2/B Shree UMA tyres, near JJ party plot PATAN, GUJARAT INDIA</p>
          </div>
          <button onClick={handleLogout} className="btn-logout" title="Logout">
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="container">
        {error && (
          <div className="error-message">
            {error}
            <button 
              onClick={() => setError(null)} 
              style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
            <button 
              onClick={() => setSuccess(null)} 
              style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Statistics Section */}
        <div className="statistics">
          <div className="stat-card total-items">
            <h3>{stats.totalItems}</h3>
            <p>Total Tyres in Stock</p>
          </div>
          <div className="stat-card total-value">
            <h3>₹{stats.totalValue.toFixed(2)}</h3>
            <p>Total Inventory Value</p>
          </div>
          <div className="stat-card low-stock">
            <h3>{stats.lowStock}</h3>
            <p>Low Stock Items</p>
          </div>
          <div className="stat-card out-stock">
            <h3>{stats.outOfStock}</h3>
            <p>Out of Stock</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            📦 Inventory
          </button>
          <button 
            className={`tab ${activeTab === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            💰 Sales History
          </button>
        </div>

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <>
            <div className="controls">
              <div className="search-filter-section">
                <div className="input-group">
                  <label>Search</label>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="input-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Filter by brand..."
                    value={filters.brand}
                    onChange={handleFilterChange}
                  />
                </div>

                <div className="input-group">
                  <label>Type</label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="All Season">All Season</option>
                    <option value="Summer">Summer</option>
                    <option value="Winter">Winter</option>
                    <option value="Performance">Performance</option>
                    <option value="Off-Road">Off-Road</option>
                    <option value="Touring">Touring</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="size-filter">Filter by Tyre Size</label>
                  <TyreSizeDropdown onSelectSize={handleSizeFilter} />
                </div>
              </div>

              <div className="button-group">
                <button onClick={handleSearch} className="btn-primary">
                  🔍 Search
                </button>
                <button onClick={handleClearFilters} className="btn-secondary">
                  Clear Filters
                </button>
                <button onClick={handleAddTyre} className="btn-success">
                  ➕ Add New Tyre
                </button>
              </div>
            </div>

            <div className="table-container">
              <div className="table-header">
                <h2>Inventory ({tyres.length} items)</h2>
              </div>

              {loading ? (
                <div className="loading">Loading tyres...</div>
              ) : (
                <TyreTable 
                  tyres={tyres} 
                  onEdit={handleEditTyre} 
                  onDelete={handleDeleteTyre}
                  onSell={handleSellTyre}
                />
              )}
            </div>
          </>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="table-container">
            <div className="table-header">
              <h2>Sales History ({sales.length} transactions)</h2>
              {sales.length > 0 && (
                <p style={{ marginTop: '0.5rem', color: '#28a745', fontSize: '1.1rem' }}>
                  <strong>Total Revenue: ₹{sales.reduce((sum, s) => sum + (s.sale_price * s.quantity_sold), 0).toFixed(2)}</strong>
                </p>
              )}
            </div>

            {loading ? (
              <div className="loading">Loading sales...</div>
            ) : (
              <SalesTable 
                sales={sales}
                onDelete={handleDeleteSale}
              />
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && modalType !== 'sell' && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modalType === 'edit' ? 'Edit Tyre' : 'Add New Tyre'}</h2>
            <TyreForm
              tyre={editingTyre}
              onSubmit={handleSubmitForm}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      {showModal && modalType === 'sell' && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>💰 Sell Tyre</h2>
            <SellForm
              tyre={sellingTyre}
              onSubmit={handleSubmitSale}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
