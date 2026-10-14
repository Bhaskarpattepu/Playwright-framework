import type { Page } from "@playwright/test";

export class HomePage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async openSignupLogin(): Promise<void> {
    await this.page.getByRole("link", { name: /signup \/ login/i }).click();
  }

  async openProducts(): Promise<void> {
    await this.page.goto("/products");
  }

  async openCart(): Promise<void> {
    await this.page.getByRole("link", { name: "Cart" }).click();
  }
}
