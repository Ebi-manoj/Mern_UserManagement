import axios from 'axios';
import { appStore } from '../../store/store';
import { logout, setAccessToken } from '../../store/authSlice';

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
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Request new access token using refresh token
        const res = await axios.get('http://localhost:3000/user/refresh', {
          withCredentials: true,
        });

        const newAccessToken = res.data.accessToken;

        // Save to Redux
        appStore.dispatch(setAccessToken(newAccessToken));

        // Update request header and retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        appStore.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
