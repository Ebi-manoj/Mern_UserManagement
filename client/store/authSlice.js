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
  },
});

export const { setCredintials, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
