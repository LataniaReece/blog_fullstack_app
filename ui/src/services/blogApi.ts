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
      keepUnusedDataFor: 60 * 60,
    }),
    getFeaturedBlogs: builder.query<BlogsResponse, void>({
      query: () => ({ url: "/blogs/featured" }),
      keepUnusedDataFor: 60 * 60,
    }),
    getBlogById: builder.query<BlogResponse, BlogByIdArg>({
      query: (queryArg) => ({ url: `/blogs/${queryArg.id}` }),
    }),
    getUserBlogs: builder.query<BlogsResponse, UserBlogsArgs>({
      query: (queryArg) => ({ url: `/blogs/user/${queryArg.id}` }),
    }),
    createBlog: builder.mutation<BlogResponse, FormData>({
      query: (newBlogData) => ({
        url: "/blogs",
        method: "POST",
        body: newBlogData,
      }),
    }),
    updateBlog: builder.mutation<BlogResponse, UpdateBlogArgs>({
      query: ({ id, formData }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: formData,
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
  accessToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

// Blogs interfaces
export interface BlogsResponse {
  blogs: Blog[];
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
}

interface UserBlogsArgs {
  id: string | null;
}

interface UpdateBlogArgs {
  id: string;
  formData: FormData;
}

interface BlogResponse {
  blog: Blog;
}
interface BlogByIdArg {
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
