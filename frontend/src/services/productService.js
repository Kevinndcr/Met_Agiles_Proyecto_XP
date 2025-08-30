import api from './api';

export const productService = {
  async getAllProducts() {
    const response = await api.get('/products');
    return response.data;
  },

  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async createProduct(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  async regenerateDescription(id) {
    const response = await api.patch(`/products/${id}/regenerate-description`);
    return response.data;
  }
};