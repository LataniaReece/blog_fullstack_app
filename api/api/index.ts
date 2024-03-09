import * as dotenv from "dotenv";
dotenv.config();

import createServer from "../src/app";

const PORT: number = process.env.PORT ? +process.env.PORT : 8000;
const MODE: string = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : "development";

const app = createServer();

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

export default app;
