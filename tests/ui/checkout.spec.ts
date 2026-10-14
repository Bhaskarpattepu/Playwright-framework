import { expect, test } from "../../src/fixtures/test";

test("[AE-UI-009] completes checkout and confirms the sandbox order", async ({
  page,
  homePage,
  loginPage,
  signupPage,
  productsPage,
  cartPage,
}) => {
  const name = "Playwright Checkout";
  const email = `playwright.${Date.now()}@example.test`;
  const password = `Pw-${Date.now()}-aA1!`;

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
  await page.getByRole("link", { name: /place order/i }).click();
  await cartPage.placeOrder();

  await expect(page.getByText(/order placed!/i)).toBeVisible();
  await page.getByRole("link", { name: "Delete Account" }).click();
  await expect(page.getByText("Account Deleted!")).toBeVisible();
});
