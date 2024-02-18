import { NextFunction, Request, Response } from "express";
import * as BlogService from "../services/blog.service";
import { CustomError } from "../utils/CustomError";
import asyncErrorHandler from "../utils/asyncErrorHandler";

// Get all blogs
export const getAllBlogs = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { blogs, totalBlogs, hasNextPage, totalPages } =
      await BlogService.getBlogs(page, limit);

    res.status(200).json({ blogs, totalPages, totalBlogs, hasNextPage });
  }
);

// Get featured blogs
export const getFeaturedBlogs = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogs } = await BlogService.getFeaturedBlogs();
    res.status(200).json({ blogs });
  }
);

// Get blogs for a specific user
export const getUserBlogs = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { blogs, totalBlogs, hasNextPage, totalPages } =
      await BlogService.getUserBlogs(userId, page, limit);

    res.status(200).json({ blogs, totalPages, totalBlogs, hasNextPage });
  }
);

export const getBlogById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id;
    const blog = await BlogService.getBlogById(blogId);

    if (!blog) {
      const err = new CustomError("Blog not found", 404);
      return next(err);
    }

    res.status(200).json({ blog });
  }
);

// Create a new blog
export const createBlog = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, categories } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!req.user) {
      const err = new CustomError("User is not authenticated", 401);
      return next(err);
    }
    const authorId = req.user.id;
    const { blog } = await BlogService.createBlog({
      title,
      content,
      categories,
      authorId,
      imageUrl,
    });
    res.status(201).json({ blog });
  }
);

// Update a blog
export const updateBlog = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id;
    const { title, content, categories, imageUrl } = req.body;

    let imageUrlToSave = null;
    if (req.file) {
      imageUrlToSave = req.file.path;
    } else if (imageUrl) {
      imageUrlToSave = imageUrl;
    }

    if (!req.user) {
      const err = new CustomError("User is not authenticated", 401);
      return next(err);
    }
    const { blog } = await BlogService.updateBlog({
      id: blogId,
      title,
      content,
      categories,
      authorId: req.user.id,
      imageUrl: imageUrlToSave,
    });
    res.status(200).json({ blog });
  }
);

// Delete a blog
export const deleteBlog = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await BlogService.deleteBlog(id);
    res.status(200).json({ message: "Blog successfully deleted" });
  }
);
