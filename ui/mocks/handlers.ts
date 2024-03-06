import { HttpResponse, http } from "msw";

const baseUrl = "http://localhost:8000/api";

export const handlers = [
  http.post(`${baseUrl}/auth/refresh-token`, () => {
    return HttpResponse.json({ accessToken: "mocked-new-access-token" });
  }),
];
