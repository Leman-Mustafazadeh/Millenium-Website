import { createSlice } from "@reduxjs/toolkit";

if (!JSON.parse(localStorage.getItem("user"))) {
  localStorage.setItem("user", JSON.stringify({ id: null, token: null }));
}

const authInitialState = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: authInitialState,
  reducers: {
    login: (state, action) => {
      // state.role = action.payload.role;
      state.id = action.payload.id;
      state.token = action.payload.token;
      localStorage.setItem(
        "user",
        JSON.stringify({ id: action.payload.id, token: "sdklgsklg" })
      );
    },
    logout: (state) => {
      state.id = null;
      state.role = "";
      localStorage.setItem("user", JSON.stringify({ id: null }));
    },
  },
});

// export const { login, logout } = userSlice.actions;
const { actions, reducer } = userSlice;

export const { login, logout } = actions;
export default reducer;
