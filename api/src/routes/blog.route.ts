import { Router } from "express";
import * as BlogController from "../controllers/blog.controller";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";
import { validateAuthenticated } from "../middleware/auth";

const router = Router();

router.get("/blogs", BlogController.getAllBlogs);
router.get("/blogs/:id", BlogController.getBlogById);
router.get(
  "/blogs/user/:userId",
  validateAuthenticated,
  BlogController.getUserBlogs
);

router.post(
  "/blogs",
  validateAuthenticated,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("categories").isArray().withMessage("Categories must be an array"),
  ],
  validateRequest,
  BlogController.createBlog
);

router.put(
  "/blogs/:id",
  validateAuthenticated,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("categories").isArray().withMessage("Categories must be an array"),
  ],
  validateRequest,
  BlogController.updateBlog
);

router.delete("/blogs/:id", validateAuthenticated, BlogController.deleteBlog);

export default router;
