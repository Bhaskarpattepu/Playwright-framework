export interface ApiEnvelope<T> {
  responseCode: number;
  message?: string;
  products?: T;
  brands?: T;
  user?: T;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: {
    usertype: { usertype: string };
    category: string;
  };
}

export interface Brand {
  id: number;
  brand: string;
}

export function parseApiEnvelope<T>(value: unknown): ApiEnvelope<T> {
  if (
    typeof value !== "object" ||
    value === null ||
    !("responseCode" in value) ||
    typeof value.responseCode !== "number" ||
    ("message" in value && typeof value.message !== "string")
  ) {
    throw new Error(
      `The API returned an unexpected response envelope: ${JSON.stringify(value).slice(0, 300)}`,
    );
  }

  return value as ApiEnvelope<T>;
}
