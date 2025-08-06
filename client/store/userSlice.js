import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userlist',
  initialState: {
    users: [],
  },
  reducers: {
    setAllusers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setAllusers } = userSlice.actions;
