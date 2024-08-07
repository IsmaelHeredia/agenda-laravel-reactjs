import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  username: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;