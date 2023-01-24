import { createSlice } from '@reduxjs/toolkit'
import { addProduct, deleteProduct } from './productActions'

const initialState = {
  loading: false,
  error: null,
  productInfo: null,
  success: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    // Add product
    [addProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true; // add product successful
    },
    [addProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Delete product
    [deleteProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true; // add product successful
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
})
export default productSlice.reducer