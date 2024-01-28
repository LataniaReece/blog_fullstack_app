import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Blog } from "../types/blogTypes";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getBlogs: builder.query<{ blogs: Blog[] }, void>({
      query: () => ({ url: "/blogs" }),
    }),
    // Define other CRUD operations here
  }),
});

export const { useGetBlogsQuery } = blogApi;
