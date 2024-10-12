import { configureStore } from "@reduxjs/toolkit";

import auth from "./redux/auth";
import user from "./redux/user";

export const store = configureStore({
  reducer: {
    user,
    auth,
  },
});
