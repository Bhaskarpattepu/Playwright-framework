import { randomUUID } from "node:crypto";
import { expect, test } from "../../src/fixtures/test";

test("[AE-UI-007] signs in with valid credentials", async ({
  page,
  homePage,
  loginPage,
  testAccount,
}) => {
  await homePage.open();
  await homePage.openSignupLogin();
  await loginPage.login(testAccount.email, testAccount.password);

  await expect(page.getByText(`Logged in as ${testAccount.name}`)).toBeVisible();
});

test("[AE-UI-008] rejects invalid login credentials", async ({
  page,
  homePage,
  loginPage,
}) => {
  await homePage.open();
  await homePage.openSignupLogin();
  await loginPage.login(`missing.${randomUUID()}@example.test`, "Invalid-password-123!");

  await expect(page.getByText(/your email or password is incorrect/i)).toBeVisible();
});
