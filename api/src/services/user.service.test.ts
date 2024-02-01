import { createUser } from "../services/user.service";
import db from "../utils/db";

const testUser = {
  id: "abc",
  username: "testuser",
  password: "123456",
};

jest.mock("../utils/db", () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(() =>
        Promise.resolve({
          id: testUser.id,
          username: testUser.username,
        })
      ),
      update: jest.fn(() => Promise.resolve({})),
    },
  },
}));

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user in the database", async () => {
    const createdUser = await createUser({
      username: testUser.username,
      password: testUser.password,
    });

    expect(createdUser).toEqual({
      user: { id: expect.anything(), username: testUser.username },
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });

    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        username: testUser.username,
        password: expect.any(String),
      },
      select: {
        id: true,
        username: true,
      },
    });
  });

  // ... other tests ...
});
