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

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse | null> {
  const API = (process.env.API_SAAT_BASE_URL ?? "").replace(/\/+$/, "");
  // Qeyd: API_SAAT_BASE_URL tipik olaraq .../api olur → /order ilə bitiririk
  const url = `${API}/order`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
