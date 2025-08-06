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
    removeUser: (state, action) => {
      state.users = state.users.filter(u => u._id.toString() != action.payload);
    },
  },
});

export default userSlice.reducer;
export const { setAllusers, removeUser } = userSlice.actions;
