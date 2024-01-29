import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { enhancedApi as blogApi } from "./services/blogApi";

export const store = configureStore({
  reducer: {
    user: authReducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
