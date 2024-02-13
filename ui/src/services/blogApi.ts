import { Blog } from "../types/blogTypes";
import { blogApi } from "./blogApiStub";

export const enhancedApi = blogApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<AuthResponse, UserCredentials>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation<AuthResponse, UserCredentials>({
      query: (loginUser) => ({
        url: "/auth/login",
        method: "POST",
        body: loginUser,
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),
    getBlogs: builder.query<BlogsResponse, BlogsArg>({
      query: (queryArg) => ({
        url: `/blogs?page=${queryArg.page}&limit=${queryArg.limit}`,
      }),
    }),
    getFeaturedBlogs: builder.query<BlogsResponse, void>({
      query: () => ({ url: "/blogs/featured" }),
    }),
    getBlogById: builder.query<BlogResponse, BlogByIdArg>({
      query: (queryArg) => ({ url: `/blogs/${queryArg.id}` }),
    }),
    getUserBlogs: builder.query<BlogsResponse, void>({
      query: (id) => ({ url: `/blogs/user/userId/${id}` }),
    }),
    createBlog: builder.mutation<BlogResponse, NewBlog>({
      query: (newBlogData) => ({
        url: "/blogs",
        method: "POST",
        body: newBlogData,
      }),
    }),
    updateBlog: builder.mutation<BlogResponse, UpdatedBlog>({
      query: ({ id, ...updatedBlogData }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: updatedBlogData,
      }),
    }),
    deleteBlog: builder.mutation<{ message: string }, BlogByIdArg>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// User interface
interface UserCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
  };
  access_token: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

// Blogs interfaces
interface BlogsResponse {
  blogs: Blog[];
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
}

interface BlogResponse {
  blog: Blog;
}
interface BlogByIdArg {
  id: string;
}

interface NewBlog {
  title: string;
  content: string;
  categories: string[];
}

interface UpdatedBlog extends NewBlog {
  id: string;
}

interface BlogsArg {
  page: number;
  limit: number;
}

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
  useGetBlogsQuery,
  useGetFeaturedBlogsQuery,
  useGetBlogByIdQuery,
  useGetUserBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = enhancedApi;
