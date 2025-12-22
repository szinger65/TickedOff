import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  tasks: {
    list: () => apiClient.get('/tasks').then(res => res.data),
    create: (data) => apiClient.post('/tasks', data).then(res => res.data),
    update: (id, data) => apiClient.put(`/tasks/${id}`, data).then(res => res.data),
    delete: (id) => apiClient.delete(`/tasks/${id}`).then(res => res.data),
  },
  goals: {
    list: () => apiClient.get('/goals').then(res => res.data),
    create: (data) => apiClient.post('/goals', data).then(res => res.data),
    update: (id, data) => apiClient.put(`/goals/${id}`, data).then(res => res.data),
    delete: (id) => apiClient.delete(`/goals/${id}`).then(res => res.data),
  },
  userProgress: {
    get: (email) => apiClient.get(`/progress/${email || 'default'}`).then(res => res.data),
    update: (id, data) => apiClient.put(`/progress/${id}`, data).then(res => res.data),
    create: (data) => apiClient.post('/progress', data).then(res => res.data),
  }
};