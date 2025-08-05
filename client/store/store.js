import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});
