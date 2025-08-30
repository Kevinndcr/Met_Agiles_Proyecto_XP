import api from './api';

export const orderService = {
  async getAllOrders() {
    const response = await api.get('/orders');
    return response.data;
  },

  async getOrderById(id) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async createOrder(orderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async updateOrder(id, orderData) {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  },

  async deleteOrder(id) {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  },

  async getRecommendations(userId) {
    const response = await api.get(`/orders/recommendations/${userId}`);
    return response.data;
  }
};