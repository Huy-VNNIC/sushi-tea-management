import axios from 'axios';

// Đảm bảo đường dẫn API đúng với cổng mà backend đang chạy
const API_BASE_URL = 'http://localhost:5000/api';

// Tạo instance axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Theo dõi request đang pending để tránh duplicate
const pendingRequests = new Map();

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Thêm token nếu có
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Kiểm tra xem người dùng đang ở trang login chưa
      if (!window.location.pathname.includes('/login')) {
        console.log('Unauthorized - redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
