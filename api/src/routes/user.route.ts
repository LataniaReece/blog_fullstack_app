import { Router } from "express";
import { body } from "express-validator";
import * as UserController from "../controllers/user.controller";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  UserController.createUser
);

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  UserController.login
);

router.post("/refresh-token", UserController.refreshToken);

export default router;
