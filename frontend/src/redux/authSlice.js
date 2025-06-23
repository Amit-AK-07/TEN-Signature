import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,  // will store user object with username property or null
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;  // action.payload should be user object with username property
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
