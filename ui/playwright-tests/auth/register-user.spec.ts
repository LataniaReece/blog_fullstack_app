import { test, expect } from "@playwright/test";

test.describe("Register", () => {
  test("Successful register should redirect user to home page", async ({
    page,
  }) => {
    // Intercept the login API call and return a mock success response
    await page.route("**/api/auth/register", (route) => {
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

    await page.goto("http://localhost:5173/register");

    // Fill in the login form and submit
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="password1"]', "password");
    await page.fill('input[name="password2"]', "password");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("http://localhost:5173/");
  });

  test("Should alert user if passwords are not matching", async ({ page }) => {
    await page.goto("http://localhost:5173/register");

    // Fill in the login form and submit
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="password1"]', "password");
    await page.fill('input[name="password2"]', "blah");
    await page.click('button[type="submit"]');

    await expect(page.getByTestId("register-password2-error")).toHaveText(
      "Passwords must match"
    );
  });

  test("Should alert user if username already exists", async ({ page }) => {
    await page.route("**/api/auth/register", (route) => {
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          message: "User already exists.",
        }),
      });
    });

    await page.goto("http://localhost:5173/register");

    // Fill in the login form and submit
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="password1"]', "password");
    await page.fill('input[name="password2"]', "password");
    await page.click('button[type="submit"]');

    await expect(page.getByTestId("register-alert")).toHaveText(
      "User Already exists.Try logging in instead."
    );
  });
});
