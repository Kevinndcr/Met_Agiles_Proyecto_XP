import api from './api';

export const purchaseService = {
  async getAllPurchases() {
    const response = await api.get('/purchases');
    return response.data;
  },

  async getPurchaseById(id) {
    const response = await api.get(`/purchases/${id}`);
    return response.data;
  },

  async createPurchase(purchaseData) {
    const response = await api.post('/purchases', purchaseData);
    return response.data;
  }
};