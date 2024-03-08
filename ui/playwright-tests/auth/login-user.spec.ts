import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("Successful login should redirect user to home page", async ({
    page,
  }) => {
    // Intercept the login API call and return a mock success response
    await page.route("**/api/auth/login", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          token: "mockToken123",
          user: {
            id: "1",
            username: "testuser",
          },
        }),
      });
    });

    await page.goto("http://localhost:5173/login");

    // Fill in the login form and submit
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="password"]', "password");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("http://localhost:5173/");
  });
  test("Incorrect login credentials should show error", async ({ page }) => {
    // Intercept the login API call and return a mock success response
    await page.route("**/api/auth/login", (route) => {
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Invalid username or password",
        }),
      });
    });

    await page.goto("http://localhost:5173/login");

    // Fill in the login form and submit
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="password"]', "password");
    await page.click('button[type="submit"]');

    await expect(page.getByTestId("login-alert")).toHaveText(
      "Invalid username or password"
    );
  });
  test("Shows alert if not username or password not provided", async ({
    page,
  }) => {
    // Intercept the login API call and return a mock success response
    await page.route("**/api/auth/login", (route) => {
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Invalid username or password",
        }),
      });
    });

    await page.goto("http://localhost:5173/login");

    // Fill in the login form and submit
    await page.fill('input[name="username"]', "");
    await page.fill('input[name="password"]', "");
    await page.click('button[type="submit"]');

    await expect(page.getByTestId("login-username-input")).toHaveText(
      "Username is required"
    );
    await expect(page.getByTestId("login-password-input")).toHaveText(
      "Password is required"
    );
  });

  test("should navigate to protected route after login", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.evaluate(() => {
      localStorage.setItem("accessToken", "mockToken123");
      localStorage.setItem("username", "testuser");
      localStorage.setItem("userId", "1");
    });
    // Reload so that state is set with the data
    await page.reload();

    await page.route("**/api/blogs/user/*", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: {
          Authorization: `Bearer mocked-auth-token`,
        },
        body: JSON.stringify({
          blogs: [],
        }),
      });
    });

    // Now navigate to the protected route
    await page.goto("http://localhost:5173/account");

    // Verify the protected content is accessible
    await expect(page.getByTestId("account-page-heading")).toHaveText(
      "Your Blogs:"
    );
  });
});
