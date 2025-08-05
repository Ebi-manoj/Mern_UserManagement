import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null, authLoading: true },
  reducers: {
    setCredintials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = false;
    },
    logout: state => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredintials, setAuthLoading, logout } = authSlice.actions;
export default authSlice.reducer;
