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
      query: (categoryId = 0) => `items?categoryId=${categoryId}`,
    })
  })
});

export const { useGetTopSalesQuery, useGetItemsQuery, useGetCategoriesQuery } = catalogApi;