import { createSlice } from '@reduxjs/toolkit'
import { addProduct } from './productActions'

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
  },
})
export default productSlice.reducer