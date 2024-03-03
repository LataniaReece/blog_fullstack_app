import request from "supertest";
import createServer from "../app";
import * as BlogService from "../services/blog.service";

jest.mock("../services/blog.service", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../services/blog.service"),
    getBlogs: jest.fn().mockResolvedValue({
      blogs: [
        {
          id: "1",
          title: "The Journey of Sustainable Living",
          content:
            "Sustainable living is more than just a trend; it's a necessary shift in how we interact with our environment. This blog explores practical steps anyone can take to live a more eco-friendly lifestyle, from reducing waste to choosing sustainable products.",
          featured: true,
          createdAt: new Date("2022-01-01T09:00:00Z"),
          updatedAt: new Date("2022-01-02T10:00:00Z"),
          authorId: "user-123",
          categories: "Sustainability, Lifestyle",
          imageUrl: "https://example.com/path/to/image.jpg",
        },
        {
          id: "2",
          title: "Exploring the World of Home Gardening",
          content:
            "Home gardening offers a plethora of benefits, from enhancing your home's aesthetic to contributing to your mental and physical health. This blog post dives into the basics of starting your own garden, covering everything from selecting the right plants to maintenance tips.",
          featured: false,
          createdAt: new Date("2022-02-01T09:00:00Z"),
          updatedAt: new Date("2022-02-02T10:00:00Z"),
          authorId: "user-456",
          categories: "Home, Gardening",
          imageUrl: "https://example.com/path/to/another/image.jpg",
        },
      ],
    }),
    getFeaturedBlogs: jest.fn().mockResolvedValue({
      blogs: [
        {
          id: "2",
          title: "Exploring the World of Home Gardening",
          content:
            "Home gardening offers a plethora of benefits, from enhancing your home's aesthetic to contributing to your mental and physical health. This blog post dives into the basics of starting your own garden, covering everything from selecting the right plants to maintenance tips.",
          featured: true,
          createdAt: new Date("2022-02-01T09:00:00Z"),
          updatedAt: new Date("2022-02-02T10:00:00Z"),
          authorId: "user-456",
          categories: "Home, Gardening",
          imageUrl: "https://example.com/path/to/another/image.jpg",
        },
      ],
    }),
    getUserBlogs: jest.fn().mockResolvedValue({
      blogs: [
        {
          id: "1",
          title: "The Journey of Sustainable Living",
          content:
            "Sustainable living is more than just a trend; it's a necessary shift in how we interact with our environment. This blog explores practical steps anyone can take to live a more eco-friendly lifestyle, from reducing waste to choosing sustainable products.",
          featured: true,
          createdAt: new Date("2022-01-01T09:00:00Z"),
          updatedAt: new Date("2022-01-02T10:00:00Z"),
          authorId: "user-123",
          categories: "Sustainability, Lifestyle",
          imageUrl: "https://example.com/path/to/image.jpg",
        },
      ],
      totalPages: 1,
      totalBlogs: 1,
      hasNextPage: false,
    }),
    getUsersWithBlogs: jest.fn().mockResolvedValue({
      users: [{ username: "user1" }, { username: "user2" }],
    }),
    getBlogById: jest.fn().mockResolvedValue({
      id: "1",
      title: "The Journey of Sustainable Living",
      content:
        "Sustainable living is more than just a trend; it's a necessary shift in how we interact with our environment. This blog explores practical steps anyone can take to live a more eco-friendly lifestyle, from reducing waste to choosing sustainable products.",
      featured: true,
      createdAt: new Date("2022-01-01T09:00:00Z"),
      updatedAt: new Date("2022-01-02T10:00:00Z"),
      authorId: "user-123",
      categories: "Sustainability, Lifestyle",
      imageUrl: "https://example.com/path/to/image.jpg",
    }),
    createBlog: jest.fn().mockResolvedValue({
      blog: {
        id: "3",
        title: "New Blog Title",
        content: "Content of the new blog.",
        categories: "New, Blog",
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: "1",
        imageUrl: "https://example.com/path/to/new/image.jpg",
      },
    }),
    updateBlog: jest.fn().mockResolvedValue({
      blog: {
        id: "3",
        title: "Updated Title",
        content: "Updated content.",
        categories: "Updated, Categories",
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: "1",
        imageUrl: "https://example.com/path/to/new/image.jpg",
      },
    }),
    deleteBlog: jest.fn(),
  };
});

const mockedBlogService = BlogService as jest.Mocked<typeof BlogService>;

const app = createServer();

const server = app.listen(0, () => {});

describe("User Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
    server.close();
  });

  it("should get all blogs", async () => {
    const response = await request(app).get("/api/blogs");

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body).toBeDefined();
    expect(Array.isArray(body.blogs)).toBeTruthy();
    expect(body.blogs.length).toBeGreaterThan(0);

    expect(mockedBlogService.getBlogs).toHaveBeenCalled();
  });

  it("should get all featured blogs", async () => {
    const response = await request(app).get("/api/blogs/featured");

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body).toBeDefined();
    expect(Array.isArray(body.blogs)).toBeTruthy();
    expect(body.blogs.length).toBeGreaterThan(0);
    expect(body.blogs.every((blog: any) => blog.featured)).toBeTruthy();

    expect(mockedBlogService.getFeaturedBlogs).toHaveBeenCalled();
  });

  it("should get blog by id", async () => {
    const blogId = "1";
    const response = await request(app).get(`/api/blogs/${blogId}`);

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body).toBeDefined();
    expect(body.blog.id).toBe(blogId);

    expect(mockedBlogService.getBlogById).toHaveBeenCalledWith(blogId);
  });

  it("should get users with blogs", async () => {
    const response = await request(app).get("/api/blogs/users-with-blogs");

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body).toBeDefined();
    expect(Array.isArray(body.users)).toBeTruthy();
    expect(body.users.length).toBeGreaterThan(0);

    expect(mockedBlogService.getUsersWithBlogs).toHaveBeenCalled();
  });

  it("should create a new blog", async () => {
    const newBlog = {
      title: "New Blog Title",
      content: "Content of the new blog.",
      categories: "New, Blog",
    };

    const createResponse = await request(app)
      .post("/api/blogs")
      .set("Authorization", "Bearer mockedJwtToken")
      .send(newBlog);

    expect(createResponse.statusCode).toBe(201);
    expect(createResponse.body.blog).toBeDefined();
    expect(createResponse.body.blog.title).toEqual(newBlog.title);
    expect(BlogService.createBlog).toHaveBeenCalledWith(
      expect.objectContaining(newBlog)
    );
  });

  it("should update a blog", async () => {
    const blogId = "1";
    const blogUpdate = {
      title: "Updated Title",
      content: "Updated content.",
      categories: "Updated, Categories",
    };

    const response = await request(app)
      .put(`/api/blogs/${blogId}`)
      .set("Authorization", "Bearer mockedJwtToken")
      .send(blogUpdate);

    expect(response.statusCode).toBe(200);
    expect(response.body.blog).toBeDefined();
    expect(response.body.blog.title).toEqual(blogUpdate.title);

    expect(mockedBlogService.updateBlog).toHaveBeenCalledWith(
      expect.objectContaining({ id: blogId, ...blogUpdate })
    );
  });

  it("should delete a blog", async () => {
    const blogId = "1";

    const response = await request(app)
      .delete(`/api/blogs/${blogId}`)
      .set("Authorization", "Bearer mockedJwtToken")
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBeDefined();

    expect(mockedBlogService.deleteBlog).toHaveBeenCalledWith(blogId);
  });
});
