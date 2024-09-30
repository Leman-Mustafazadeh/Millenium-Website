import { createSlice } from "@reduxjs/toolkit";

if (!JSON.parse(localStorage.getItem('user'))) {
    localStorage.setItem('user',JSON.stringify({id:null,role:''}))
}

const authInitialState = JSON.parse(localStorage.getItem('user'));

const userSlice = createSlice({
  name: "user",
  initialState: authInitialState,
  reducers: {
    login: (state, action) => {
      state.role = action.payload.role;
      state.id = action.payload._id;
      //local storage
      localStorage.setItem(
        "user",
        JSON.stringify({ role: action.payload.role, id: action.payload._id })
      );
    },
    logout: (state) => {
        state.id = null;
        state.role = '';
        localStorage.setItem('user',JSON.stringify({id:null,role:''}));
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
