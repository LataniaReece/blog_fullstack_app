export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  setupFiles: ["<rootDir>/jest.setup.ts"],
};
