import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/auth.js"
export const store = configureStore({
  reducer: {
    // user,
    auth:userReducer
  },
});
