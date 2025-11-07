// lib/api/orders.ts
export type CreateOrderItem = { productId: number; count: number };

export type CreateOrderPayload = {
  fullName: string;
  phoneNumber: string;
  mail: string;
  customerAdress: string;
  city: string;
  additionalInfo?: string;
  orderItems: CreateOrderItem[];
};

export type CreateOrderResponse = {
  orderId?: number;
  success?: boolean;
  message?: string;
} & Record<string, unknown>;

export async function createOrder(
  payload: CreateOrderPayload
): Promise<CreateOrderResponse | null> {
  // env dəyişmədən backend URL-i manual götürürük
  const API =
    process.env.API_SAAT_BASE_URL?.trim().replace(/\/+$/, "") ||
    "https://api.saat.az/api";

  const url = `${API}/Order`; // https://api.saat.az/api/Order

  console.log("CREATE ORDER URL:", url);
  console.log("CREATE ORDER PAYLOAD:", payload);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // yalnız dev zamanı lazımdır, prod-da silmək olar
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`POST ${url} -> ${res.status} ${text}`);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}
