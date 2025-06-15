import apiClient from './client';

const settingsApi = {
  /**
   * Lấy cài đặt công khai
   * @returns {Promise} - Settings data
   */
  getPublicSettings: async () => {
    const response = await apiClient.get('/settings/public');
    return response.data;
  }
};

export default settingsApi;
