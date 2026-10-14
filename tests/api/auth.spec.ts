import { randomUUID } from "node:crypto";
import { parseApiEnvelope } from "../../src/types/api";
import { expect, test } from "../../src/fixtures/test";

const password = `Pw-${randomUUID()}-aA1!`;

function newAccount(): Record<string, string> {
  return {
    name: "Playwright API",
    email: `playwright.${randomUUID()}@example.test`,
    password,
    title: "Mr",
    birth_date: "10",
    birth_month: "5",
    birth_year: "1990",
    firstname: "Playwright",
    lastname: "API",
    company: "Test Automation",
    address1: "1 Test Street",
    address2: "",
    country: "United States",
    zipcode: "10001",
    state: "New York",
    city: "New York",
    mobile_number: "5550100100",
  };
}

test.describe("Account REST API", () => {
  test("[AE-API-001] creates an account, verifies credentials, and deletes the account", async ({ api }) => {
    const account = newAccount();
    const createResponse = await api.createAccount(account);
    expect(createResponse.ok()).toBeTruthy();
    const created = parseApiEnvelope<never>(await createResponse.json());
    expect(created.responseCode).toBe(201);
    expect(created.message).toMatch(/user created/i);

    try {
      const loginResponse = await api.verifyLogin(account.email, account.password);
      expect(loginResponse.ok()).toBeTruthy();
      const login = parseApiEnvelope<never>(await loginResponse.json());
      expect(login.responseCode).toBe(200);
      expect(login.message).toMatch(/user exists/i);
    } finally {
      const deleteResponse = await api.deleteAccount(account.email, account.password);
      expect(deleteResponse.ok()).toBeTruthy();
      const deleted = parseApiEnvelope<never>(await deleteResponse.json());
      expect(deleted.responseCode).toBe(200);
      expect(deleted.message).toMatch(/account deleted/i);
    }
  });

  test("[AE-API-002] rejects login when required credentials are missing", async ({ request }) => {
    const response = await request.post("/api/verifyLogin", {
      form: { password: "not-a-real-password" },
    });
    const body = parseApiEnvelope<never>(await response.json());

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(400);
    expect(body.message).toMatch(/email or password parameter is missing/i);
  });

  test("[AE-API-003] rejects unsupported login verification methods", async ({ request }) => {
    const response = await request.delete("/api/verifyLogin");
    const body = parseApiEnvelope<never>(await response.json());

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(405);
    expect(body.message).toMatch(/request method is not supported/i);
  });
});
