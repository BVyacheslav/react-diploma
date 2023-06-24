import { configureStore } from "@reduxjs/toolkit";
import { catalogApi } from "./catalogApi";
import { catalogSliceReducer } from "./catalogSlice";

export const store = configureStore({
  reducer: {
    catalog: catalogSliceReducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(catalogApi.middleware)
});