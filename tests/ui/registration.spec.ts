import { randomUUID } from "node:crypto";
import { expect, test } from "../../src/fixtures/test";

test("[AE-UI-006] registers a new user and verifies account creation", async ({
  page,
  homePage,
  loginPage,
  signupPage,
}) => {
  const name = "Playwright UI";
  const email = `playwright.${randomUUID()}@example.test`;
  const password = `Pw-${randomUUID()}-aA1!`;

  await homePage.open();
  await homePage.openSignupLogin();
  await expect(page.getByRole("heading", { name: /new user signup/i })).toBeVisible();
  await loginPage.beginSignup(name, email);

  await expect(page.getByText("Enter Account Information")).toBeVisible();
  await signupPage.completeRegistration({
    name,
    password,
    firstName: "Playwright",
    lastName: "UI",
    address: "1 Test Street",
    country: "United States",
    state: "New York",
    city: "New York",
    zipcode: "10001",
    mobile: "5550100101",
  });

  await expect(page.getByText("Account Created!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
  await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();
  await page.getByRole("link", { name: "Delete Account" }).click();
  await expect(page.getByText("Account Deleted!")).toBeVisible();
});
