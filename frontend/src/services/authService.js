import api from './api';
import Cookies from 'js-cookie';

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      Cookies.set('authToken', response.data.token, { expires: 1 }); // 1 día
    }
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      Cookies.set('authToken', response.data.token, { expires: 1 });
    }
    return response.data;
  },

  logout() {
    Cookies.remove('authToken');
  },

  isAuthenticated() {
    return !!Cookies.get('authToken');
  },

  getToken() {
    return Cookies.get('authToken');
  }
};