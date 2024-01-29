import { NextFunction, Request, Response } from "express";

import * as UserService from "../services/user.service";
import asyncErrorHandler from "../utils/asyncErrorHandler";

export const createUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const { user, accessToken, refreshToken } = await UserService.createUser({
      username,
      password,
    });

    // Set the refresh token as an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user, accessToken });
  }
);

export const login = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const { user, accessToken, refreshToken } = await UserService.loginUser({
      username,
      password,
    });

    // Set the refresh token as an HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ user, accessToken });
  }
);

export const refreshToken = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const providedRefreshToken = req.cookies.refreshToken;
    const { accessToken } = await UserService.refreshToken(
      providedRefreshToken
    );
    res.json({ accessToken });
  }
);
