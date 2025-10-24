// slices/languageSlice.js
import { createSlice } from '@reduxjs/toolkit'
const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem('currentLanguage')
  return savedLanguage || 'EN'
}
const initialState = {
  currentLanguage: getInitialLanguage(),
}

const languageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.currentLanguage = action.payload
      localStorage.setItem('currentLanguage', action.payload) // Yeni dili Local Storage'a kaydetme
    },
  },
})
export const { changeLanguage } = languageSlice.actions
export default languageSlice.reducer
