export default {
  rootDir: "<rootDir>",
  testEnvironment: "node",
  collectCoverageFrom: ["packages*.{ts,tsx}", "apps*.{ts,tsx}"],
  moduleFileExtensions: ["ts", "tsx"],
  moduleNameMapper: {},
  transform: {
    "^.+\\.tsx?$": ["@swc/jest"],
  },
};
