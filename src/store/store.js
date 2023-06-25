import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { catalogApi } from "./catalogApi";
import { catalogReducer } from "./catalogSlice";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [catalogApi.reducerPath]
}

const persistedReducer = persistReducer(persistConfig, catalogReducer)

export const store = configureStore({
  reducer: {
    catalog: persistedReducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(catalogApi.middleware)
});

export const persistor = persistStore(store);