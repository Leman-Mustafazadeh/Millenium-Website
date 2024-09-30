import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/user.js";
export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});
