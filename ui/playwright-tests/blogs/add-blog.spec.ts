import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe("Adding Blog", () => {
  test("it should redirect to login page if trying to add a blog and not logged in", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/blogs/new");
    await expect(page).toHaveURL("http://localhost:5173/login");
  });

  test("it should add a blog successfully", async ({ page }) => {
    await page.route("**/api/auth/login", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          accessToken: "mockToken123",
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

    await page.reload();

    // Mock api call adding a new blog
    await page.route("**/api/blogs", (route) => {
      route.fulfill({
        status: 201,
        contentType: "application/json",
        headers: {
          Authorization: `Bearer mockToken123`,
        },
        body: JSON.stringify({
          id: "1",
          title: "Test Blog",
          content: "<p>This is a test blog!</p>",
          featured: false,
          createdAt: "2024-03-06T19:20:55.889Z",
          updatedAt: "2024-03-06T19:20:55.889Z",
          authorId: "1",
          categories: "Sustainability,Health",
          imageUrl:
            "https://res.cloudinary.com/ddxxsib3q/image/upload/v1709752854/blog_fullstack_app/yhhwnkjgam6mnggfrpna.jpg",
        }),
      });
    });

    // Navigate to add new blog page
    await page.goto("http://localhost:5173/blogs/new");

    // Add all fields
    await page.getByLabel("Title:").click();
    await page.getByLabel("Title:").fill("Test Blog");
    await page.getByTestId("tag-Sustainability").click();
    await page.getByTestId("tag-Health").click();
    await page.locator(".ql-editor").click();
    await page.locator(".ql-editor").fill("This is a test blog!");
    const imagePath = path.join(__dirname, "blue3d.jpg");

    await page.setInputFiles('input[type="file"]', imagePath);
    await page.getByRole("button", { name: "Create Blog" }).click();

    // Mock account page blogs/user api call
    await page.route("**/api/blogs/user/*", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: {
          Authorization: `Bearer mockToken123`,
        },
        body: JSON.stringify({
          blogs: [
            {
              id: "1",
              title: "Test Blog",
              content: "<p>This is a test blog!</p>",
              featured: false,
              createdAt: "2024-03-06T19:20:55.889Z",
              updatedAt: "2024-03-06T19:20:55.889Z",
              authorId: "1",
              categories: ["Sustainability", "Health"],
              imageUrl:
                "https://res.cloudinary.com/ddxxsib3q/image/upload/v1709752854/blog_fullstack_app/yhhwnkjgam6mnggfrpna.jpg",
            },
          ],
        }),
      });
    });

    // Should successfully be redirected to account with new blog visible on the page
    await expect(page).toHaveURL("http://localhost:5173/account");
    await page.evaluate(() => {
      localStorage.setItem("accessToken", "mockToken123");
      localStorage.setItem("username", "testuser");
      localStorage.setItem("userId", "1");
    });
    // Reload so that state is set with the data
    await page.reload();
    expect(page.getByTestId("blog-list"));
    expect(page.getByTestId("blog-item-1"));
    await expect(page.getByTestId("blog-item-1-title")).toHaveText("Test Blog");

    // Expect new blog to be on the page
  });

  test("it should show an error if all fields are not entered", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    await page.evaluate(() => {
      localStorage.setItem("accessToken", "mockToken123");
      localStorage.setItem("username", "testuser");
      localStorage.setItem("userId", "1");
    });
    // Reload so that state is set with the data
    await page.reload();

    // Navigate to add blog
    await page.route("**/api/blogs", (route) => {
      route.fulfill({
        status: 201,
        contentType: "application/json",
        headers: {
          Authorization: `Bearer mockToken123`,
        },
        body: JSON.stringify({
          id: "ed56f772-38f9-4d76-9ccd-303d2baa54cb",
          title: "Test Blog",
          content: "<p>This is a test blog!</p>",
          featured: false,
          createdAt: "2024-03-06T19:20:55.889Z",
          updatedAt: "2024-03-06T19:20:55.889Z",
          authorId: "3ce3eefc-6c58-42a7-9c4a-ab9361240eec",
          categories: "Sustainability,Health",
          imageUrl:
            "https://res.cloudinary.com/ddxxsib3q/image/upload/v1709752854/blog_fullstack_app/yhhwnkjgam6mnggfrpna.jpg",
        }),
      });
    });

    await page.goto("http://localhost:5173/blogs/new");

    // Add some fields
    await page.getByLabel("Title:").click();
    await page.getByLabel("Title:").fill("Test Blog");
    await page.getByTestId("tag-Sustainability").click();
    await page.getByTestId("tag-Health").click();

    await page.getByRole("button", { name: "Create Blog" }).click();

    await expect(page.getByTestId("blog-form-alert")).toHaveText(
      "Please enter all fields"
    );
  });
});
