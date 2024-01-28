import * as dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import routes from "./routes";

const app: Application = express();
const PORT: number = process.env.PORT ? +process.env.PORT : 8000;
const MODE: string = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : "development";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .listen(PORT, function () {
    console.log(`Running in ${MODE} mode.`);
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });

// Routes
app.use("/api/auth", routes.userRoutes);
app.use("/api/blogs", routes.blogRoutes);

app.use(globalErrorHandler);

export default app;
