import { createSlice } from "@reduxjs/toolkit";
import { loginData } from "./auth";

if (!JSON.parse(localStorage.getItem("user"))) {
  localStorage.setItem("user", JSON.stringify({ id: null, token: null }));
}

const authInitialState = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
  name: "auth",
  initialState: {
    loginData
  },
  reducers: {
    login: (state, action) => {
     Cookies.set("ftoken",action.payload.token)
     state.loginData=action.payload
      state.id = action.payload.id;
      localStorage.setItem(
        "user",
        JSON.stringify({ id: action.payload.id, token:"" })
      );
    },
    logout: (state) => {
      state.id = null;
      state.role = "";
      localStorage.setItem("user", JSON.stringify({ id: null }));
      Cookies.remove("token")
    },
  },
});

// export const { login, logout } = userSlice.actions;
const { actions, reducer } = userSlice;

export const { login, logout } = actions;
export default reducer;
