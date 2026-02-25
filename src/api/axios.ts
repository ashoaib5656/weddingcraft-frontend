import axios from 'axios';

const API_BASE = (import.meta.env.VITE_API_URL as string) ?? 'http://localhost:32226';
const api = axios.create({ baseURL: `${API_BASE}/api` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && config.headers) {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
