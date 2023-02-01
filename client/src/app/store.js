import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import popupReducer from '../features/Popup/popupSlice';
import productStateReducer from '../features/productState/productStateSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
        productState: productStateReducer,
    },
})