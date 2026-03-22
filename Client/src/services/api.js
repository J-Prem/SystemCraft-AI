import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (data) => api.post('/auth/signin', data),
  register: (data) => api.post('/auth/signup', data),
};

export const projectService = {
  create: (data) => api.post('/projects', data),
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const chatService = {
  sendMessage: (projectId, message) => api.post(`/chat/${projectId}`, { message }),
  getHistory: (projectId) => api.get(`/chat/${projectId}/history`),
};

export default api;
