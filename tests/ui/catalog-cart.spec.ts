import { expect, test } from "../../src/fixtures/test";

test("[AE-UI-001] displays the product catalog", async ({ page, homePage }) => {
  await homePage.open();
  await homePage.openProducts();

  await expect(page.getByRole("heading", { name: "All Products" })).toBeVisible();
  await expect(page.locator(".product-image-wrapper").first()).toBeVisible();
});

test("[AE-UI-002] searches for a product and shows matching results", async ({
  page,
  homePage,
  productsPage,
}) => {
  await homePage.open();
  await homePage.openProducts();
  await productsPage.search("top");

  await expect(page.getByText("Searched Products")).toBeVisible();
  const matches = page
    .locator(".product-image-wrapper")
    .filter({ hasText: /top/i });
  await expect(matches.first()).toBeVisible();
  await expect(matches).not.toHaveCount(0);
});

test("[AE-UI-003] displays product details", async ({
  page,
  homePage,
  productsPage,
}) => {
  await homePage.open();
  await homePage.openProducts();
  await productsPage.openFirstProductDetails("top");

  const productDetails = page.locator(".product-information");
  await expect(productDetails).toContainText(/availability:/i);
  await expect(productDetails).toContainText(/condition:/i);
  await expect(productDetails).toContainText(/brand:/i);
});

test("[AE-UI-004] adds a searched product to the cart", async ({
  page,
  homePage,
  productsPage,
  cartPage,
}) => {
  await homePage.open();
  await homePage.openProducts();
  await productsPage.search("top");
  await productsPage.addFirstProductToCart("top");
  await expect(page.getByText("Your product has been added to cart.")).toBeVisible();
  await productsPage.continueShopping();
  await homePage.openCart();

  await expect(cartPage.rows).toHaveCount(1);
  await expect(cartPage.rows.first()).toContainText(/top/i);
});

test("[AE-UI-005] removes a product from the cart", async ({
  page,
  homePage,
  productsPage,
  cartPage,
}) => {
  await homePage.open();
  await homePage.openProducts();
  await productsPage.addFirstProductToCart();
  await expect(page.getByText("Your product has been added to cart.")).toBeVisible();
  await productsPage.continueShopping();
  await homePage.openCart();
  await expect(cartPage.rows).toHaveCount(1);
  await cartPage.rows.first().locator(".cart_delete a").click();

  await expect(cartPage.rows).toHaveCount(0);
  await expect(page.getByText(/cart is empty/i)).toBeVisible();
});
