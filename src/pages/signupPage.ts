import type { Page } from "@playwright/test";

export interface SignupDetails {
  name: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
}

export class SignupPage {
  constructor(private readonly page: Page) {}

  async completeRegistration(details: SignupDetails): Promise<void> {
    await this.page.locator("#id_gender1").check();
    await this.page.locator('[data-qa="password"]').fill(details.password);
    await this.page.locator('[data-qa="days"]').selectOption("10");
    await this.page.locator('[data-qa="months"]').selectOption("5");
    await this.page.locator('[data-qa="years"]').selectOption("1990");
    await this.page.locator('[data-qa="first_name"]').fill(details.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(details.lastName);
    await this.page.locator('[data-qa="address"]').fill(details.address);
    await this.page.locator('[data-qa="country"]').selectOption(details.country);
    await this.page.locator('[data-qa="state"]').fill(details.state);
    await this.page.locator('[data-qa="city"]').fill(details.city);
    await this.page.locator('[data-qa="zipcode"]').fill(details.zipcode);
    await this.page.locator('[data-qa="mobile_number"]').fill(details.mobile);
    await this.page.locator('[data-qa="create-account"]').click();
  }
}
