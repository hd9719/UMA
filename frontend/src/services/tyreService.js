const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const tyreService = {
  // Get all tyres with optional filters
  getAllTyres: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.brand) queryParams.append('brand', filters.brand);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters.order) queryParams.append('order', filters.order);

    const url = `${API_BASE_URL}/tyres?${queryParams.toString()}`;
    const response = await fetch(url);
    return response.json();
  },

  // Get single tyre by ID
  getTyreById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tyres/${id}`);
    return response.json();
  },

  // Create new tyre
  createTyre: async (tyreData) => {
    const response = await fetch(`${API_BASE_URL}/tyres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tyreData),
    });
    return response.json();
  },

  // Update tyre
  updateTyre: async (id, tyreData) => {
    const response = await fetch(`${API_BASE_URL}/tyres/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tyreData),
    });
    return response.json();
  },

  // Delete tyre
  deleteTyre: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tyres/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Get filter options
  getBrands: async () => {
    const response = await fetch(`${API_BASE_URL}/tyres/filters/brands`);
    return response.json();
  },

  getTypes: async () => {
    const response = await fetch(`${API_BASE_URL}/tyres/filters/types`);
    return response.json();
  },
};

export const salesService = {
  // Get all sales
  getAllSales: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);

    const url = `${API_BASE_URL}/sales?${queryParams.toString()}`;
    const response = await fetch(url);
    return response.json();
  },

  // Record a sale
  recordSale: async (saleData) => {
    const response = await fetch(`${API_BASE_URL}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saleData),
    });
    return response.json();
  },

  // Delete a sale
  deleteSale: async (id) => {
    const response = await fetch(`${API_BASE_URL}/sales/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Get sales statistics
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/sales/stats/summary`);
    return response.json();
  },
};
