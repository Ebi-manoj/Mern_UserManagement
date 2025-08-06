import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import userReducer from '../store/userSlice';

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    usersList: userReducer,
  },
});
