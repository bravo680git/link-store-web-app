import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: localStorage.getItem("isLogin") ?? false,
  role: localStorage.getItem("role") ?? "user",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState: (state, action) => action.payload,
  },
});

export default authSlice.reducer;
export const { setLoginState } = authSlice.actions;
