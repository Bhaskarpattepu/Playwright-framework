import type { Page } from "@playwright/test";

export class CartPage {
  constructor(private readonly page: Page) {}

  get rows() {
    return this.page.locator("#cart_info_table tbody tr");
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByText("Proceed To Checkout").click();
  }

  async placeOrder(): Promise<void> {
    await this.page.locator('[data-qa="name-on-card"]').fill("Playwright Demo");
    await this.page.locator('[data-qa="card-number"]').fill("4111111111111111");
    await this.page.locator('[data-qa="cvc"]').fill("123");
    await this.page.locator('[data-qa="expiry-month"]').fill("12");
    await this.page.locator('[data-qa="expiry-year"]').fill("2030");
    await this.page.locator('[data-qa="pay-button"]').click();
  }
}
