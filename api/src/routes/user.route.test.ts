import request from "supertest";
import createServer from "../app";
import * as UserService from "../services/user.service";

jest.mock("../services/user.service", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../services/user.service"),
    createUser: jest.fn().mockResolvedValue({
      user: { id: "1", username: "testuser" },
      accessToken: "fake_access_token",
      refreshToken: "fake_refresh_token",
    }),
    loginUser: jest.fn().mockResolvedValue({
      user: { id: "1", username: "testuser" },
      accessToken: "fake_access_token",
      refreshToken: "fake_refresh_token",
    }),
    refreshToken: jest.fn().mockResolvedValue({
      accessToken: "new_fake_access_token",
    }),
  };
});

const mockedUserService = UserService as jest.Mocked<typeof UserService>;

const testUser = {
  username: "testuser",
  password: "testpassword",
};

const app = createServer();

const server = app.listen(0, () => {});

describe("User Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
    server.close();
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "testpassword" });

    expect(response.statusCode).toBe(201);
    expect(response.body.user.username).toEqual("testuser");
    expect(mockedUserService.createUser).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });
  });

  it("should login the user", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ username: testUser.username, password: testUser.password });
    expect(mockedUserService.createUser).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });

    // Then, attempt to log in
    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: testUser.username, password: testUser.password });

    expect(mockedUserService.loginUser).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });

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

  it("should refresh the access token using a refresh token from a cookie", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ username: testUser.username, password: testUser.password });

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: testUser.username, password: testUser.password });

    const setCookieHeader = loginResponse.headers["set-cookie"];
    const cookiesArray = Array.isArray(setCookieHeader)
      ? setCookieHeader
      : [setCookieHeader];
    const refreshTokenCookie = cookiesArray.find((cookie) =>
      cookie.startsWith("refreshToken=")
    );

    const refreshResponse = await request(app)
      .post("/api/auth/refresh-token")
      .set("Cookie", refreshTokenCookie);

    expect(refreshResponse.statusCode).toBe(200);
    expect(refreshResponse.body).toHaveProperty(
      "accessToken",
      "new_fake_access_token"
    );

    expect(UserService.refreshToken).toHaveBeenCalledWith(expect.any(String));
  });
});
