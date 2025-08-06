import axios from 'axios';
import { appStore } from '../../store/store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  config => {
    const state = appStore.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
