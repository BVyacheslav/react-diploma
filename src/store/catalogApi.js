import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7070/api/' }),
  endpoints: (build) => ({
    getTopSales: build.query({
      query: () => `top-sales`,
    })
  })
});

export const { useGetTopSalesQuery } = catalogApi;