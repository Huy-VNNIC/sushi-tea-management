import apiClient from './client';

const toppingApi = {
  /**
   * Lấy danh sách toppings
   * @returns {Promise} - Toppings data
   */
  getToppings: async () => {
    const response = await apiClient.get('/toppings');
    return response.data;
  }
};

export default toppingApi;
