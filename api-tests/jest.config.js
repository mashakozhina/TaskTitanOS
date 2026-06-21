require("dotenv/config");

/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/specs/**/*.test.ts"],
  testTimeout: 20000,
  reporters: [
    "default",
    [
      "jest-html-reporters",
      { publicPath: "./jest-report", filename: "index.html" },
    ],
  ],
};

module.exports = config;
