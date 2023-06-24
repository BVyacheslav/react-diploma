import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7070/api/' }),
  endpoints: (build) => ({
    getTopSales: build.query({
      query: () => `top-sales`,
    }),
    getCategories: build.query({
      query: () => `categories`,
    }),
    getItems: build.query({
      query: (query = '') => query,
    }),
    getItemById: build.query({
      query: (itemId) => `items/${itemId}`,
    }),
  })
});

export const { useGetTopSalesQuery, useGetItemsQuery, useGetCategoriesQuery, useGetItemByIdQuery } = catalogApi;