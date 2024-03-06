import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { render } from "../../utils/test-utils";

import BlogDetail from "../BlogDetail";
import { Route, Routes } from "react-router-dom";
import { server } from "../../../mocks/server";
import { HttpResponse, http } from "msw";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

describe("<BlogDetail />", () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    window.scroll = vi.fn((_) => {}) as unknown as typeof window.scroll;
  });

  describe("<BlogDetail />", () => {
    it("displays the blog details correctly", async () => {
      server.use(
        http.get(`${baseUrl}/blogs/:id`, () => {
          return HttpResponse.json({
            blog: {
              id: "1",
              title: "Test Blog",
              content: "<p>Test Content</p>",
              categories: "Lifestyle, Health",
              author: { id: "user1", username: "Test Author" },
              updatedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            },
          });
        })
      );
      render(
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>,
        {
          initialState: {},
          useMemoryRouter: true,
          initialEntries: ["/blogs/131312"],
        }
      );

      expect(screen.getByText(/Loading blog.../i)).toBeInTheDocument();

      expect(await screen.findByText("Test Blog")).toBeInTheDocument();
    });
    it("displays an error message if the blog could not be found", async () => {
      server.use(
        http.get(`${baseUrl}/blogs/:id`, () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      render(
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>,
        {
          useMemoryRouter: true,
          initialEntries: ["/blogs/nonexistent"],
        }
      );

      expect(await screen.findByText(/No blog found/i)).toBeInTheDocument();
    });
    it("displays an error message if there is an error fetching the blog", async () => {
      server.use(
        http.get(`${baseUrl}/blogs/:id`, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      render(
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>,
        {
          useMemoryRouter: true,
          initialEntries: ["/blogs/exists"],
        }
      );

      expect(
        await screen.findByText(/Error fetching blog/i)
      ).toBeInTheDocument();
    });
  });
});
