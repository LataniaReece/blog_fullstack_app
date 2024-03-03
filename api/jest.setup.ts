import * as dotenv from "dotenv";
dotenv.config({ path: `.env.test` });

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(() => "mockedJwtToken"),
  sign: jest.fn(() => "mockedJwtToken"),
}));
