// slices/languageSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Local Storage'dan dili alma veya varsayılan değeri ('EN') ayarlama
const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem('currentLanguage')
  return savedLanguage || 'EN'
}

// Başlangıç durumu
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

// Actionları ve reducer'ı dışa aktarma
export const { changeLanguage } = languageSlice.actions
export default languageSlice.reducer
