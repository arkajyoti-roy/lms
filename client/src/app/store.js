import { configureStore } from "@reduxjs/toolkit";
import { authApi } from '../features/api/authApi';
import rootReducer from "./rootrRducer";

export const appStore = configureStore({
    reducer: {
        auth: rootReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});