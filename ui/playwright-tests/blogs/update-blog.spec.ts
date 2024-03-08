import { test, expect } from "@playwright/test";

test.describe("Updating Blog", () => {
  test("it should redirect to login page if trying to update a blog and not logged in", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/blogs/update/123");
    await expect(page).toHaveURL("http://localhost:5173/login");
  });

  test("it should update a blog successfully", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.evaluate(() => {
      localStorage.setItem("accessToken", "mockToken123");
      localStorage.setItem("username", "testuser");
      localStorage.setItem("userId", "1");
    });
    // Reload so that state is set with the data
    await page.reload();

    let blogData = {
      blog: {
        id: "123",
        title: "Initial Blog Title",
        content: "Initial blog post content...",
        featured: true,
        createdAt: "2024-03-02T22:19:03.396Z",
        updatedAt: "2024-03-02T22:19:03.396Z",
        authorId: "3ce3eefc-6c58-42a7-9c4a-ab9361240eec",
        categories: "Sustainability, Lifestyle",
        imageUrl: "https://example.com/initial-image.jpg",
        author: {
          id: "3ce3eefc-6c58-42a7-9c4a-ab9361240eec",
          username: "initialAuthor",
        },
      },
    };

    // Setup mock responses for GET and PUT requests
    await page.route("**/api/blogs/123", async (route) => {
      const method = route.request().method();

      if (method === "PUT") {
        const updatedBlogData = {
          blog: {
            id: "123",
            title: "Updated Blog Title",
            content: "Updated blog post content...",
            featured: true,
            createdAt: "2024-03-02T22:19:03.396Z",
            updatedAt: "2024-03-02T22:19:03.396Z",
            authorId: "3ce3eefc-6c58-42a7-9c4a-ab9361240eec",
            categories: "Sustainability,Health",
            imageUrl: "https://example.com/initial-image.jpg",
            author: {
              id: "3ce3eefc-6c58-42a7-9c4a-ab9361240eec",
              username: "initialAuthor",
            },
          },
        };

        blogData = updatedBlogData;
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(updatedBlogData),
        });
      } else if (method === "GET") {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(blogData),
        });
      } else {
        route.continue();
      }
    });

    await page.goto("http://localhost:5173/blogs/update/123");

    //Expect fields to be prefilled
    const title = page.getByTestId("blog-form-title");
    let sustainabilityTag = page.getByTestId("tag-Sustainability");
    let lifestyleTag = page.getByTestId("tag-Lifestyle");
    let healthTag = page.getByTestId("tag-Health");

    let sustainabilityTagColor = await sustainabilityTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });
    let lifestyleTagColor = await lifestyleTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });
    let healthTagColor = await healthTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });
    const contentEditor = page.locator(".ql-editor");

    //Expect fields to be prefilled in
    expect(title).toHaveValue("Initial Blog Title");
    expect(contentEditor).toHaveText("Initial blog post content...");
    expect(sustainabilityTagColor).toBe("rgb(0, 0, 0)");
    expect(lifestyleTagColor).toBe("rgb(0, 0, 0)");
    expect(healthTagColor).toBe("rgba(0, 0, 0, 0)");

    // Update fields

    // Tags
    await sustainabilityTag.click();
    await lifestyleTag.click();
    await healthTag.click();

    sustainabilityTag = page.getByTestId("tag-Sustainability");
    lifestyleTag = page.getByTestId("tag-Lifestyle");
    healthTag = page.getByTestId("tag-Health");

    sustainabilityTagColor = await sustainabilityTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });
    lifestyleTagColor = await lifestyleTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });
    healthTagColor = await healthTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });

    expect(lifestyleTagColor).toBe("rgba(0, 0, 0, 0)");
    expect(sustainabilityTagColor).toBe("rgba(0, 0, 0, 0)");
    expect(healthTagColor).toBe("rgb(0, 0, 0)");

    //Title and content
    await title.fill("Updated Blog Title");
    await contentEditor.click();
    await contentEditor.fill("This is the updated blog!");

    expect(title).toHaveValue("Updated Blog Title");
    expect(contentEditor).toHaveText("This is the updated blog!");

    await page.getByRole("button", { name: "Update Blog" }).click();

    // Should successfully be redirected to the blog detail page
    await expect(page).toHaveURL("http://localhost:5173/blogs/123");
  });

  test("it should show error if fields are empty", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.evaluate(() => {
      localStorage.setItem("accessToken", "mockToken123");
      localStorage.setItem("username", "testuser");
      localStorage.setItem("userId", "1");
    });
    // Reload so that state is set with the data
    await page.reload();

    const blogData = {
      blog: {
        id: "123",
        title: "Initial Blog Title",
        content: "Initial blog post content...",
        featured: true,
        createdAt: "2024-03-02T22:19:03.396Z",
        updatedAt: "2024-03-02T22:19:03.396Z",
        authorId: "3ce3eefc-6c58-42a7-9c4a-ab9361240eec",
        categories: "Sustainability, Lifestyle",
        imageUrl: "https://example.com/initial-image.jpg",
        author: {
          id: "3ce3eefc-6c58-42a7-9c4a-ab9361240eec",
          username: "initialAuthor",
        },
      },
    };

    // Setup mock responses for GET and PUT requests
    await page.route("**/api/blogs/123", async (route) => {
      const method = route.request().method();

      if (method === "GET") {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(blogData),
        });
      } else {
        route.continue();
      }
    });

    await page.goto("http://localhost:5173/blogs/update/123");

    //Expect fields to be prefilled
    const title = page.getByTestId("blog-form-title");
    let sustainabilityTag = page.getByTestId("tag-Sustainability");
    let lifestyleTag = page.getByTestId("tag-Lifestyle");
    let healthTag = page.getByTestId("tag-Health");

    let sustainabilityTagColor = await sustainabilityTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });
    let lifestyleTagColor = await lifestyleTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });
    let healthTagColor = await healthTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });
    const contentEditor = page.locator(".ql-editor");

    //Expect fields to be prefilled in
    expect(title).toHaveValue("Initial Blog Title");
    expect(contentEditor).toHaveText("Initial blog post content...");
    expect(sustainabilityTagColor).toBe("rgb(0, 0, 0)");
    expect(lifestyleTagColor).toBe("rgb(0, 0, 0)");
    expect(healthTagColor).toBe("rgba(0, 0, 0, 0)");

    // Update fields

    // Tags
    await sustainabilityTag.click();
    await lifestyleTag.click();
    await healthTag.click();

    sustainabilityTag = page.getByTestId("tag-Sustainability");
    lifestyleTag = page.getByTestId("tag-Lifestyle");
    healthTag = page.getByTestId("tag-Health");

    sustainabilityTagColor = await sustainabilityTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });
    lifestyleTagColor = await lifestyleTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });
    healthTagColor = await healthTag.evaluate((button) => {
      return window.getComputedStyle(button).backgroundColor;
    });

    expect(lifestyleTagColor).toBe("rgba(0, 0, 0, 0)");
    expect(sustainabilityTagColor).toBe("rgba(0, 0, 0, 0)");
    expect(healthTagColor).toBe("rgb(0, 0, 0)");

    //Title and content
    await title.fill("");
    await contentEditor.click();
    await contentEditor.fill("");

    expect(title).toHaveValue("");
    expect(contentEditor).toHaveText("");

    await page.getByRole("button", { name: "Update Blog" }).click();
    expect(page.getByTestId("blog-form-alert")).toHaveText(
      "Please enter all fields"
    );
  });
});
