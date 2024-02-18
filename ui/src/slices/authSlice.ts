import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, enhancedApi as blogApi } from "../services/blogApi";

interface InitialState {
  accessToken: string | null;
  id: string | null;
  username: string | null;
}

const initialState: InitialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  id: localStorage.getItem("userId") || null,
  username: localStorage.getItem("username") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserOut: (state) => {
      state.accessToken = null;
      state.username = null;
      state.id = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      window.location.replace("/");
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      // Consider if you also want to clear userId and username here
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        blogApi.endpoints.createUser.matchFulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.accessToken = action.payload.accessToken;
          state.username = action.payload.user.username;
          state.id = action.payload.user.id;
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("userId", action.payload.user.id);
          localStorage.setItem("username", action.payload.user.username);
        }
      )
      .addMatcher(
        blogApi.endpoints.loginUser.matchFulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.accessToken = action.payload.accessToken;
          state.username = action.payload.user.username;
          state.id = action.payload.user.id;
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("userId", action.payload.user.id);
          localStorage.setItem("username", action.payload.user.username);
        }
      );
  },
});

export const { clearAccessToken, logUserOut } = authSlice.actions;
export default authSlice.reducer;
