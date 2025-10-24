import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authInitialState = Cookies.get("ftoken") || null;

const userSlice = createSlice({
  name: "auth",
  initialState: {
    registerData: null,
    loginData: authInitialState,
  },
  reducers: {
    register: (state,action) => {
      state.register = action.payload;
    },
    login: (state, action) => {
      console.log("Action Payload inside login:", action.payload);
      state.loginData = action.payload;
      Cookies.set("ftoken", action.payload.token); 
    },
    logout: (state) => {
      state.loginData = null;
      Cookies.remove("ftoken"); 
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
