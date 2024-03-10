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
      query: (queryArg) => {
        let url = `/blogs?page=${queryArg.page}&limit=${queryArg.limit}`;

        if (queryArg.category) {
          url += `&category=${encodeURIComponent(queryArg.category)}`;
        }
        if (queryArg.authorName) {
          url += `&author=${encodeURIComponent(queryArg.authorName)}`;
        }
        if (queryArg.keyword) {
          url += `&keyword=${encodeURIComponent(queryArg.keyword)}`;
        }

        return { url };
      },
      providesTags: ["AllBlogs"],
    }),
    getFeaturedBlogs: builder.query<BlogsResponse, void>({
      query: () => ({ url: "/blogs/featured" }),
      providesTags: ["FeaturedBlogs"],
    }),
    getUsersWithBlogs: builder.query<UsersWithBlogsResponse, void>({
      query: () => ({ url: "/blogs/users-with-blogs" }),
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
      invalidatesTags: ["UserBlogs", "AllBlogs", "FeaturedBlogs"],
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
        "FeaturedBlogs",
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
  category?: string | null;
  authorName?: string | null;
  keyword?: string | null;
}

interface UserBlogsArgs extends BlogsArg {
  id: string | null;
}

interface UsersWithBlogsResponse {
  users: { username: string }[];
}

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
  useGetBlogsQuery,
  useGetFeaturedBlogsQuery,
  useGetUsersWithBlogsQuery,
  useGetBlogByIdQuery,
  useGetUserBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = enhancedApi;
