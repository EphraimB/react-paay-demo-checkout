import { createSlice } from '@reduxjs/toolkit'
import { addProduct, editProduct, deleteProduct, getProducts } from './productActions'

const initialState = {
  loading: false,
  error: null,
  productInfo: null,
  success: false,
  products: [],
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
    // Edit product
    [editProduct.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true; // edit product successful
    },
    [editProduct.rejected]: (state, { payload }) => {
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
      state.success = true; // delete product successful
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Get products
    [getProducts.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.products = [];
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      state.success = true; // get products successful
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload
    },
  },
})

export default productSlice.reducer