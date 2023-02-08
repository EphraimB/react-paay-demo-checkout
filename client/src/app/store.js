import { configureStore } from '@reduxjs/toolkit';
import popupReducer from '../features/Popup/popupSlice';
import productStateReducer from '../features/productState/productStateSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
    reducer: {
        popup: popupReducer,
        productState: productStateReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})