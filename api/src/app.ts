import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler";
import routes from "./routes";

function createServer() {
  const app: Application = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api/auth", routes.userRoutes);
  app.use("/api/blogs", routes.blogRoutes);

  app.use(globalErrorHandler);
  return app;
}

export default createServer;
