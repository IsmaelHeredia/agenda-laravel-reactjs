import { createSlice } from "@reduxjs/toolkit";

const getToken = () => sessionStorage.getItem('token');

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!getToken(),
  },
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      sessionStorage.removeItem('token');
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
