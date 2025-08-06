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
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        u => u._id.toString() === action.payload._id.toString()
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export default userSlice.reducer;
export const { setAllusers, removeUser, updateUser } = userSlice.actions;
