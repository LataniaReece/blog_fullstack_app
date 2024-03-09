import * as dotenv from "dotenv";
dotenv.config();

import createServer from "../src/app";

const app = createServer();

const MODE: string = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : "development";

// In development, listen on a port. In production, do not.
if (MODE === "development") {
  const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
  app.listen(PORT, () => {
    console.log(`Running in ${MODE} mode.`);
    console.log(`Server is running on port ${PORT}.`);
  });
} else {
  // For Vercel, export the app as a serverless function
  module.exports = app;
}
