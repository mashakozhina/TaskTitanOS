import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const BASE_URL = process.env.BASE_URL;
if (!BASE_URL)
  throw new Error("BASE_URL is not set. Check ui-tests/.env file.");

export default defineConfig({
  testDir: "./integration",
  testMatch: "**/*.spec.ts",
  outputDir: "./test-results",
  timeout: 60_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    [
      "html",
      {
        outputFolder: "report",
        open: "never",
      },
    ],
  ],
  use: {
    baseURL: BASE_URL,
    screenshot: "only-on-failure",
    video: "on-first-retry",
    trace: "on-first-retry",
    headless: true,
    locale: "en-GB",
    timezoneId: "Europe/London",
    extraHTTPHeaders: {
      "Accept-Language": "en-GB,en;q=0.9",
    },
  },
  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.CI ? undefined : "chrome",
      },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
