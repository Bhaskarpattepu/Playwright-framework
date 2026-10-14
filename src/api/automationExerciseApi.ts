import type { APIRequestContext, APIResponse } from "@playwright/test";

export class AutomationExerciseApi {
  constructor(private readonly request: APIRequestContext) {}

  getProducts(): Promise<APIResponse> {
    return this.request.get("/api/productsList");
  }

  searchProducts(searchProduct: string): Promise<APIResponse> {
    return this.request.post("/api/searchProduct", {
      form: { search_product: searchProduct },
    });
  }

  verifyLogin(email: string, password: string): Promise<APIResponse> {
    return this.request.post("/api/verifyLogin", {
      form: { email, password },
    });
  }

  createAccount(account: Record<string, string>): Promise<APIResponse> {
    return this.request.post("/api/createAccount", { form: account });
  }

  deleteAccount(email: string, password: string): Promise<APIResponse> {
    return this.request.delete("/api/deleteAccount", {
      form: { email, password },
    });
  }
}
