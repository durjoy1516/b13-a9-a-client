import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

// Request Interceptor: স্থানীয়ভাবে সংরক্ষিত JWT টোকেনটি প্রতিবার হেডার হিসেবে পাঠাবে
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem('access-token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default axiosSecure;