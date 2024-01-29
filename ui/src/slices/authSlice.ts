import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  AuthResponse,
  RefreshTokenResponse,
  enhancedApi as blogApi,
} from "../services/blogApi";

interface InitialState {
  accessToken: string | null;
  id: string | null;
  username: string | null;
  isLoggedIn: boolean;
}

const initialState: InitialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  id: null,
  username: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserOut: (state) => {
      state.accessToken = null;
      state.username = null;
      state.id = null;
      state.isLoggedIn = false;
      window.location.replace("/");
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        blogApi.endpoints.createUser.matchFulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.accessToken = action.payload.access_token;
          state.username = action.payload.user.username;
          state.id = action.payload.user.id;
          state.isLoggedIn = true;
          localStorage.setItem("accessToken", action.payload.access_token);
        }
      )
      .addMatcher(
        blogApi.endpoints.loginUser.matchFulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.accessToken = action.payload.access_token;
          state.username = action.payload.user.username;
          state.id = action.payload.user.id;
          state.isLoggedIn = true;
          localStorage.setItem("accessToken", action.payload.access_token);
        }
      )
      .addMatcher(
        blogApi.endpoints.refreshToken.matchFulfilled,
        (state, action: PayloadAction<RefreshTokenResponse>) => {
          state.accessToken = action.payload.accessToken;
          localStorage.setItem("accessToken", action.payload.accessToken);
        }
      );
  },
});

export const { clearAccessToken } = authSlice.actions;
export default authSlice.reducer;
