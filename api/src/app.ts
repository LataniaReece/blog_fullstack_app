import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler";
import routes from "./routes";

function createServer() {
  const app: Application = express();

  const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use((req, res, next) => {
    console.log("Frontend Origin:", process.env.FRONTEND_ORIGIN);
    console.log("Incoming Request Origin:", req.headers.origin);
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
