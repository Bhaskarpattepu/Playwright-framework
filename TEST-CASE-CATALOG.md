# Regression Test Case Catalog

This catalog is the test-to-requirement map for this framework. Each ID appears in exactly one Playwright test title, so the catalog, test report, and `--grep` command refer to the same case. These cases validate the existing Automation Exercise demo, not a separate application or a locally simulated backend.

## UI regression cases

| ID | Area | Preconditions and actions | Expected result | Automated test |
| --- | --- | --- | --- | --- |
| AE-UI-001 | Product catalog | Open the Products page. | Catalog heading and at least one product are visible. | [catalog-cart.spec.ts](./tests/ui/catalog-cart.spec.ts) |
| AE-UI-002 | Product search | Search the catalog for `top`. | Search-results heading appears and matching products are shown. | [catalog-cart.spec.ts](./tests/ui/catalog-cart.spec.ts) |
| AE-UI-003 | Product details | Open a matching product's details. | Availability, condition, and brand details are visible. | [catalog-cart.spec.ts](./tests/ui/catalog-cart.spec.ts) |
| AE-UI-004 | Cart: add item | Search for `top`, add a matching product, then open the cart. | Add confirmation appears and the cart contains the matching item. | [catalog-cart.spec.ts](./tests/ui/catalog-cart.spec.ts) |
| AE-UI-005 | Cart: remove item | Add a catalog product and remove it from the cart. | Cart has no item rows and shows its empty state. | [catalog-cart.spec.ts](./tests/ui/catalog-cart.spec.ts) |
| AE-UI-006 | Registration | Submit a unique user's registration details. | Account-created confirmation and signed-in account name appear. | [registration.spec.ts](./tests/ui/registration.spec.ts) |
| AE-UI-007 | Sign-in: valid credentials | A unique account is provisioned through the API fixture; sign in through the UI. | The signed-in account name appears. The fixture deletes the account after the test. | [login.spec.ts](./tests/ui/login.spec.ts) |
| AE-UI-008 | Sign-in: invalid credentials | Submit a unique, nonexistent email and an invalid password. | The demo displays its invalid-credentials message. | [login.spec.ts](./tests/ui/login.spec.ts) |
| AE-UI-009 | Checkout and order confirmation | Register a user, add an item, review the checkout address/order, and submit fictional sandbox card data. | The demo confirms the order. No real payment is made. | [checkout.spec.ts](./tests/ui/checkout.spec.ts) |

## REST API regression cases

| ID | Area | Preconditions and actions | Expected result | Automated test |
| --- | --- | --- | --- | --- |
| AE-API-001 | Account lifecycle | Create a uniquely named account, verify its credentials, and delete it. | API reports account creation, valid login, and account deletion. | [auth.spec.ts](./tests/api/auth.spec.ts) |
| AE-API-002 | Login validation | Send login verification without required credentials. | API reports response code 400 and a missing-credentials message. | [auth.spec.ts](./tests/api/auth.spec.ts) |
| AE-API-003 | Login method validation | Send an unsupported HTTP method to login verification. | API reports response code 405 and an unsupported-method message. | [auth.spec.ts](./tests/api/auth.spec.ts) |
| AE-API-004 | Product catalog | Request the products list. | API returns response code 200, products, and the required product fields. | [products.spec.ts](./tests/api/products.spec.ts) |
| AE-API-005 | Product search | Search the product API for `top`. | API returns response code 200 and at least one matching product. | [products.spec.ts](./tests/api/products.spec.ts) |
| AE-API-006 | Brand catalog | Request the brands list. | API returns response code 200 and a populated, structurally valid list. | [products.spec.ts](./tests/api/products.spec.ts) |
| AE-API-007 | Product method validation | POST to the GET-only products-list endpoint. | API reports response code 405 and an unsupported-method message. | [products.spec.ts](./tests/api/products.spec.ts) |

## Running individual cases

Run the full suite, a layer, or one exact case:

```powershell
npm test
npm run test:ui
npm run test:api
npm test -- --grep "AE-UI-002"
npm test -- --grep "AE-API-005"
```

The HTML report and console output include the ID and case name on every result. Add future cases to this catalog and give the Playwright test the same unique ID in its title; the `--grep` command can then select that case directly.

## Explicitly uncovered demo capabilities

The selected demo does not expose documented REST operations for applying coupons, charging payments, managing submitted orders, or reading order history. The catalog intentionally does not claim API regression coverage for those features. Checkout exercises the demo's mock UI payment form only.
