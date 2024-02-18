import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logUserOut } from "../slices/authSlice";

const refreshAccessToken = async () => {
  try {
    // Sending a request to the refresh-token endpoint.
    // The refresh token is sent automatically in a cookie.
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();

    if (response.ok && data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } else {
      console.error("Failed to refresh token");
      return null;
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include", // Include credentials in every request
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && "status" in result.error && result.error.status === 401) {
    // Token is expired, attempt to refresh
    const newToken = await refreshAccessToken();
    if (newToken) {
      // Update the authorization header with the new token
      const modifiedArgs = {
        ...args,
        headers: {
          ...args.headers,
          authorization: `Bearer ${newToken}`,
        },
      };
      // Retry the original query with the new token
      result = await baseQuery(modifiedArgs, api, extraOptions);
    } else {
      api.dispatch(logUserOut());
      window.location.href = "/login";
    }
  }
  return result;
};

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
