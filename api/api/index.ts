import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";

import createServer from "../src/app";

const app = createServer();

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const MODE: string = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : "development";

const handler = (req: Request, res: Response) => {
  app(req, res);
};

if (MODE === "development") {
  app.listen(PORT, () => {
    console.log(`Running in ${MODE} mode on http://localhost:${PORT}`);
  });
}

export default handler;
