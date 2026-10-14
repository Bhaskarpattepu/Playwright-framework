import { expect, test } from "../../src/fixtures/test";
import { randomUUID } from "node:crypto";

test("[AE-UI-009] completes checkout and confirms the sandbox order", async ({
  page,
  homePage,
  loginPage,
  signupPage,
  productsPage,
  cartPage,
  api,
}) => {
  test.setTimeout(75_000);

  const name = "Playwright Checkout";
  const email = `playwright.${randomUUID()}@example.test`;
  const password = `Pw-${randomUUID()}-aA1!`;
  let accountCreated = false;

  try {
    await homePage.open();
    await homePage.openSignupLogin();
    await loginPage.beginSignup(name, email);
    await signupPage.completeRegistration({
      name,
      password,
      firstName: "Playwright",
      lastName: "Checkout",
      address: "1 Test Street",
      country: "United States",
      state: "New York",
      city: "New York",
      zipcode: "10001",
      mobile: "5550100102",
    });
    await expect(page.getByText("Account Created!")).toBeVisible();
    accountCreated = true;
    await page.getByRole("link", { name: "Continue" }).click();

    await homePage.openProducts();
    await productsPage.addFirstProductToCart();
    await expect(page.getByText("Your product has been added to cart.")).toBeVisible();
    await productsPage.continueShopping();
    await homePage.openCart();
    await cartPage.proceedToCheckout();

    await expect(page.getByText("Address Details")).toBeVisible();
    await expect(page.getByText("Review Your Order")).toBeVisible();
    await page.locator("textarea[name='message']").fill("Playwright sandbox order");
    await cartPage.continueToPayment();
    await cartPage.placeOrder();

    await expect(page.getByText(/order placed!/i)).toBeVisible();
    await page.getByRole("link", { name: "Delete Account" }).click();
    await expect(page.getByText("Account Deleted!")).toBeVisible();
    accountCreated = false;
  } finally {
    if (accountCreated) {
      const response = await api.deleteAccount(email, password);
      expect(response.ok()).toBeTruthy();
      const body: unknown = await response.json();
      expect(body).toMatchObject({ responseCode: 200 });
    }
  }
});
