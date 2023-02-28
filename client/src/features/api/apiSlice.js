import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001', credentials: "include", }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProduct: builder.query({
      query: ({ id }) => `/products/${id}`,
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product
      }),
    }),
    editProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.get("product_id")}`,
        method: 'PUT',
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
    }),
    getItems: builder.query({
      query: () => '/items',
    }),
    addItem: builder.mutation({
      query: (items) => ({
        url: '/items',
        method: 'POST',
        body: items
      }),
    }),
    editItem: builder.mutation({
      query: (item) => ({
        url: `/item/${item.cart_id}`,
        method: 'PUT',
        body: item,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/item/${id}`,
        method: 'DELETE',
      }),
    }),
    checkout: builder.mutation({
      query: (phoneNumber) => ({
        url: '/checkout',
        method: 'POST',
        body: phoneNumber
      }),
    }),
    getUser: builder.query({
      query: () => '/user',
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user
      }),
    }),
    logout: builder.mutation({
      query: (user) => ({
        url: '/logout',
        method: 'POST',
        body: user
      }),
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetItemsQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
  useCheckoutMutation,
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation
} = apiSlice;