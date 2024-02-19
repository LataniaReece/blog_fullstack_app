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
      providesTags: ["AllBlogs"],
    }),
    getFeaturedBlogs: builder.query<BlogsResponse, void>({
      query: () => ({ url: "/blogs/featured" }),
      keepUnusedDataFor: 60 * 60,
    }),
    getBlogById: builder.query<BlogResponse, BlogByIdArg>({
      query: (queryArg) => ({ url: `/blogs/${queryArg.id}` }),
      providesTags: (_, __, arg) => [{ type: "BlogDetail", id: arg.id }],
    }),
    getUserBlogs: builder.query<BlogsResponse, UserBlogsArgs>({
      query: (queryArg) => ({
        url: `/blogs/user/${queryArg.id}?page=${queryArg.page}&limit=${queryArg.limit}`,
      }),
      providesTags: ["UserBlogs"],
    }),
    createBlog: builder.mutation<BlogResponse, FormData>({
      query: (newBlogData) => ({
        url: "/blogs",
        method: "POST",
        body: newBlogData,
      }),
      invalidatesTags: ["UserBlogs", "AllBlogs"],
    }),
    updateBlog: builder.mutation<BlogResponse, UpdateBlogArgs>({
      query: ({ id, formData }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (_, __, { id }) => [
        "UserBlogs",
        "AllBlogs",
        { type: "BlogDetail", id },
      ],
    }),
    deleteBlog: builder.mutation<{ message: string }, BlogByIdArg>({
      query: (queryArg) => ({
        url: `/blogs/${queryArg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserBlogs", "AllBlogs"],
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

interface UpdateBlogArgs {
  id: string | undefined;
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

interface UserBlogsArgs extends BlogsArg {
  id: string | null;
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
