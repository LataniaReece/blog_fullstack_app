import authReducer, { logUserOut } from "./authSlice";

describe("Auth Reducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return initial state when called with undefined state and an unknown action", () => {
    const initialState = {
      accessToken: null,
      id: null,
      username: null,
    };

    expect(authReducer(undefined, { type: "noop" })).toEqual(initialState);
  });

  it("should clear user credentials in state if logUserOut is dispatched", () => {
    const initialState = {
      accessToken: "fake_token",
      id: "1",
      username: "test_username",
    };

    expect(authReducer(initialState, { type: "noop" })).toEqual(initialState);

    expect(authReducer(initialState, logUserOut())).toEqual({
      accessToken: null,
      id: null,
      username: null,
    });
  });
});
