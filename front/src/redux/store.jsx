// store.js
import { configureStore } from '@reduxjs/toolkit'
import languageSlice from './slices/languageSlice'

export const store = configureStore({
  reducer: {
    languages: languageSlice, // languages olarak languageSlice'ı ekleme
  },
})
