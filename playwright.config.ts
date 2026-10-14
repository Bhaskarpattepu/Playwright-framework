import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "https://automationexercise.com";
const apiBaseURL = process.env.API_BASE_URL ?? baseURL;

for (const [name, value] of [
  ["BASE_URL", baseURL],
  ["API_BASE_URL", apiBaseURL],
] as const) {
  try {
    new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute URL; received "${value}".`);
  }
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
