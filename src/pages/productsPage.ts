import type { Page } from "@playwright/test";

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async search(term: string): Promise<void> {
    await this.page.locator("#search_product").fill(term);
    await this.page.locator("#submit_search").click();
  }

  async addFirstProductToCart(searchTerm?: string): Promise<void> {
    const product = this.firstProduct(searchTerm);
    await product.hover();
    await product.locator(".add-to-cart").last().click();
  }

  async openFirstProductDetails(searchTerm?: string): Promise<void> {
    await this.firstProduct(searchTerm)
      .getByRole("link", { name: /view product/i })
      .click();
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole("button", { name: /continue shopping/i }).click();
  }

  private firstProduct(searchTerm?: string) {
    const products = this.page.locator(".product-image-wrapper");
    return searchTerm
      ? products.filter({ hasText: new RegExp(searchTerm, "i") }).first()
      : products.first();
  }
}
