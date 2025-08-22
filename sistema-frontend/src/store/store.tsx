import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import themesSliceReducer from "@store/reducers/themesSlice";
import filtersSliceReducer from "@store/reducers/filtersSlice";
import authSliceReducer from "@store/reducers/authSlice";
import paginationSliceReducer from "@store/reducers/paginationSlice";

import { apiIngreso, apiCategorias, apiNotas, apiCuenta, apiAuth } from "@store/api/apiSlices";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const themesPersistConfig = {
  key: "themes",
  storage,
  blacklist: ["theme_style"],
};

const rootReducer = combineReducers({
  [apiIngreso.reducerPath]: apiIngreso.reducer,
  [apiCategorias.reducerPath]: apiCategorias.reducer,
  [apiNotas.reducerPath]: apiNotas.reducer,
  [apiCuenta.reducerPath]: apiCuenta.reducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  themes: persistReducer(themesPersistConfig, themesSliceReducer),
  filters: filtersSliceReducer,
  auth: authSliceReducer,
  pagination: paginationSliceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      apiIngreso.middleware,
      apiCategorias.middleware,
      apiNotas.middleware,
      apiCuenta.middleware,
      apiAuth.middleware,
    ]),
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
