import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import popupReducer from '../features/Popup/popupSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
    },
})