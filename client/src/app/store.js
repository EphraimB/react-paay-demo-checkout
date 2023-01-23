import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import popupReducer from '../features/Popup/popupSlice';
import productReducer from '../features/Products/productSlice';
import menuReducer from '../features/Menu/menuSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
        product: productReducer,
        menu: menuReducer,
    },
})