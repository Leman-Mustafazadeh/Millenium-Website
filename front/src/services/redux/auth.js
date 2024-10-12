import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginData: [],
  },
  reducers: {
    loginData: (state, action) => {
      state.loginData = action.payload;
    },
  },
});

// export const { login, logout } = userSlice.actions;
const { actions, reducer } = userSlice;
export const { loginData } = actions;
export default reducer;
