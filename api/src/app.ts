import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler";
import routes from "./routes";

function createServer() {
  const app: Application = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_ORIGIN,
      credentials: true,
    })
  );

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN);
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes

  app.get("/", (req, res) => {
    res.send("Welcome to the API");
  });

  app.use("/api/auth", routes.userRoutes);
  app.use("/api/blogs", routes.blogRoutes);

  app.use(globalErrorHandler);
  return app;
}

export default createServer;
