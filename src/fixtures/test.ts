import { test as base, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { AutomationExerciseApi } from "../api/automationExerciseApi";
import { parseApiEnvelope } from "../types/api";
import { CartPage } from "../pages/cartPage";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { SignupPage } from "../pages/signupPage";

interface Fixtures {
  api: AutomationExerciseApi;
  testAccount: { name: string; email: string; password: string };
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
}

export const test = base.extend<Fixtures>({
  request: async ({ playwright }, use) => {
    const apiRequest = await playwright.request.newContext({
      baseURL:
        process.env.API_BASE_URL ??
        process.env.BASE_URL ??
        "https://automationexercise.com",
    });
    try {
      await use(apiRequest);
    } finally {
      await apiRequest.dispose();
    }
  },
  api: async ({ request }, use) => {
    await use(new AutomationExerciseApi(request));
  },
  testAccount: async ({ api }, use) => {
    const account = {
      name: "Playwright Regression",
      email: `playwright.${randomUUID()}@example.test`,
      password: `Pw-${randomUUID()}-aA1!`,
    };
    const created = await api.createAccount({
      ...account,
      title: "Mr",
      birth_date: "10",
      birth_month: "5",
      birth_year: "1990",
      firstname: "Playwright",
      lastname: "Regression",
      company: "Test Automation",
      address1: "1 Test Street",
      address2: "",
      country: "United States",
      zipcode: "10001",
      state: "New York",
      city: "New York",
      mobile_number: "5550100100",
    });
    expect(created.ok()).toBeTruthy();
    expect(parseApiEnvelope<never>(await created.json()).responseCode).toBe(201);

    try {
      await use(account);
    } finally {
      const deleted = await api.deleteAccount(account.email, account.password);
      expect(deleted.ok()).toBeTruthy();
      expect(parseApiEnvelope<never>(await deleted.json()).responseCode).toBe(200);
    }
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect };
