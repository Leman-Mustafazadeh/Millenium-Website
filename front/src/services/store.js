import { configureStore } from "@reduxjs/toolkit";
import {userSlice} from "./redux/user"
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
