import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products`,
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
        url: `/products/${product.id}`,
        method: 'PUT',
        body: product
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: 'DELETE',
        body: id
      }),
    }),
  }),
})

export const {
  useGetProductsQuery
} = apiSlice;