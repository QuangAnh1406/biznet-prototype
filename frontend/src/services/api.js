import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
};

// User APIs
export const userApi = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  submitKYC: (id, data) => api.post(`/users/${id}/kyc`, data),
};

// Product APIs
export const productApi = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Marketplace APIs
export const marketplaceApi = {
  browse: (params) => api.get('/marketplace', { params }),
  getFeatured: () => api.get('/marketplace/featured'),
  getStats: () => api.get('/marketplace/stats'),
};

// Association APIs
export const associationApi = {
  getAll: (params) => api.get('/associations', { params }),
  getById: (id) => api.get(`/associations/${id}`),
  create: (data) => api.post('/associations', data),
  addMember: (id, data) => api.post(`/associations/${id}/members`, data),
  getMembers: (id) => api.get(`/associations/${id}/members`),
};

// Transaction APIs
export const transactionApi = {
  create: (data) => api.post('/transactions', data),
  getByBuyer: (buyerId, params) => api.get(`/transactions/buyer/${buyerId}`, { params }),
  updateStatus: (id, data) => api.put(`/transactions/${id}/status`, data),
  initiatePayment: (id, data) => api.post(`/transactions/${id}/payment`, data),
};

// Notification APIs
export const notificationApi = {
  getByUser: (userId, params) => api.get(`/notifications/user/${userId}`, { params }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  create: (data) => api.post('/notifications', data),
};

export default api;