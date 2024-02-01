import request from "supertest";
import truncateTables from "../utils/testdbCleanup";
import prisma from "../utils/db";
import createServer from "../app";

const testUser = {
  username: "testuser",
  password: "testpassword",
};

const app = createServer();

const server = app.listen(0, () => {});

describe("User Routes", () => {
  beforeEach(async () => {
    await truncateTables();
  });

  afterAll((done) => {
    prisma
      .$disconnect()
      .then(() => {
        server.close(done);
      })
      .catch(done);
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: testUser.username, password: testUser.password });

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.username).toEqual(testUser.username);
    expect(response.body).toHaveProperty("accessToken");
  });

  it("should login the user", async () => {
    // First, register the user
    await request(app)
      .post("/api/auth/register")
      .send({ username: testUser.username, password: testUser.password });

    // Then, attempt to log in
    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: testUser.username, password: testUser.password });

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.username).toEqual(testUser.username);
    expect(response.body).toHaveProperty("accessToken");
  });

  it("should error message if user tries to register with no username", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "", password: testUser.password });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });
});
