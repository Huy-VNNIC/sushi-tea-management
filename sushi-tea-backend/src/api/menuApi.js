import apiClient from './client';

export const menuApi = {
  /**
   * Lấy toàn bộ menu
   * @returns {Promise} - Menu data
   */
  getFullMenu: async () => {
    const response = await apiClient.get('/menu');
    return response.data;
  },

  /**
   * Lấy sản phẩm bán chạy
   * @returns {Promise} - Best seller data
   */
  getBestSellers: async () => {
    const response = await apiClient.get('/menu/best-sellers');
    return response.data;
  },

  /**
   * Lấy menu theo danh mục
   * @param {string} slug - Category slug
   * @returns {Promise} - Category menu data
   */
  getMenuByCategory: async (slug) => {
    const response = await apiClient.get(`/menu/category/${slug}`);
    return response.data;
  }
};
