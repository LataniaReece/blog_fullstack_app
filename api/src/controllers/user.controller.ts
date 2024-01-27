import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import * as UserService from "../services/user.service";
import { CustomError } from "../utils/CustomError";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import prisma from "../utils/db";

export const createUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const { user, accessToken, refreshToken } = await UserService.createUser({
      username,
      password,
    });

    res.status(201).json({ user, accessToken, refreshToken });
  }
);

export const login = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const { user, accessToken, refreshToken } = await UserService.loginUser({
      username,
      password,
    });

    res.json({ user, accessToken, refreshToken });
  }
);

export const refreshToken = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const providedRefreshToken = req.body.refreshToken;
    const { accessToken } = await UserService.refreshToken(
      providedRefreshToken
    );
    res.json({ accessToken });
  }
);
