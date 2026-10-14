import { parseApiEnvelope } from "../../src/types/api";
import type { Brand, Product } from "../../src/types/api";
import { expect, test } from "../../src/fixtures/test";

test.describe("Products REST API", () => {
  test("[AE-API-004] returns the product catalog with required product fields", async ({ api }) => {
    const response = await api.getProducts();

    expect(response.ok()).toBeTruthy();
    const body = parseApiEnvelope<Product[]>(await response.json());
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeDefined();
    expect(body.products!.length).toBeGreaterThan(0);
    expect(body.products![0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(String),
      brand: expect.any(String),
      category: {
        usertype: { usertype: expect.any(String) },
        category: expect.any(String),
      },
    });
  });

  test("[AE-API-005] returns products matching a search term", async ({ api }) => {
    const response = await api.searchProducts("top");

    expect(response.ok()).toBeTruthy();
    const body = parseApiEnvelope<Product[]>(await response.json());
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeDefined();
    expect(body.products!.length).toBeGreaterThan(0);
    expect(body.products!.some((product) => /top/i.test(product.name))).toBe(true);
  });

  test("[AE-API-006] returns the brand catalog", async ({ request }) => {
    const response = await request.get("/api/brandsList");

    expect(response.ok()).toBeTruthy();
    const body = parseApiEnvelope<Brand[]>(await response.json());
    expect(body.responseCode).toBe(200);
    expect(body.brands).toBeDefined();
    expect(body.brands!.length).toBeGreaterThan(0);
    expect(body.brands![0]).toMatchObject({
      id: expect.any(Number),
      brand: expect.any(String),
    });
  });

  test("[AE-API-007] rejects unsupported product catalog methods", async ({ request }) => {
    const response = await request.post("/api/productsList");
    const body = parseApiEnvelope<never>(await response.json());

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(405);
    expect(body.message).toMatch(/request method is not supported/i);
  });
});
