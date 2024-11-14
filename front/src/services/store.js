import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/auth.js";
import languageSlice from "./redux/languages.js";

export const store = configureStore({
  reducer: {
    // user,
    auth:userReducer,
    languages: languageSlice, // languages olarak languageSlice'ı ekleme
  },
});
