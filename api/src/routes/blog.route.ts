import { Router } from "express";
import * as BlogController from "../controllers/blog.controller";
import { body } from "express-validator";
import multer from "multer";
import { validateRequest } from "../middleware/validateRequest";
import { validateAuthenticated } from "../middleware/auth";

import { storage } from "../utils/cloudinary";
const upload = multer({ storage });

const router = Router();

router.get("/", BlogController.getAllBlogs);
router.get("/featured", BlogController.getFeaturedBlogs);
router.get("/:id", BlogController.getBlogById);
router.get("/user/:userId", validateAuthenticated, BlogController.getUserBlogs);

router.post(
  "/",
  validateAuthenticated,
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("categories").isArray().withMessage("Categories must be an array"),
  ],
  validateRequest,
  BlogController.createBlog
);

router.put(
  "/:id",
  validateAuthenticated,
  upload.single("image"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("categories").isArray().withMessage("Categories must be an array"),
  ],
  validateRequest,
  BlogController.updateBlog
);

router.delete("/:id", validateAuthenticated, BlogController.deleteBlog);

export default router;
