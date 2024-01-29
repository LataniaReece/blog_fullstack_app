import jwt from "jsonwebtoken";
import { comparePasswords, createJWT, hashPassword } from "../middleware/auth";
import { CustomError } from "../utils/CustomError";
import prisma from "../utils/db";

interface UserCreateInput {
  username: string;
  password: string;
}

export const createUser = async ({ username, password }: UserCreateInput) => {
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
    },
  });

  const { accessToken, refreshToken } = createJWT(user.id);

  // Store the refresh token in the database
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken, refreshTokenIssuedAt: new Date() },
  });

  return { user, accessToken, refreshToken };
};

export const loginUser = async ({ username, password }: UserCreateInput) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new CustomError("Invalid username or password", 400);
  }

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new CustomError("Invalid username or password", 400);
  }

  const { accessToken, refreshToken } = createJWT(user.id);

  // Store the refresh token in the database
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken, refreshTokenIssuedAt: new Date() },
  });

  return {
    user: { id: user.id, username: user.username },
    accessToken,
    refreshToken,
  };
};

export const refreshToken = async (providedRefreshToken: string) => {
  if (!providedRefreshToken) {
    throw new CustomError("Refresh token is required", 400);
  }

  // Verify the refresh token
  let decoded;
  try {
    decoded = jwt.verify(
      providedRefreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );
  } catch (error) {
    throw new CustomError("Invalid refresh token", 401);
  }

  const userId = (decoded as any).userId;

  // Check if the user exists and the refresh token is valid
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.refreshToken !== providedRefreshToken) {
    throw new CustomError("Invalid refresh token", 401);
  }

  // Generate a new access token
  const newAccessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "30m",
    }
  );

  return { accessToken: newAccessToken };
};
