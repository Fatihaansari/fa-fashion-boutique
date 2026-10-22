export type OrderItem = {
  slug: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  placedAt: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    paymentMethod: "cod" | "bank-transfer";
  };
};

const ORDER_KEY = "outfit-by-fa-last-order";

export function saveOrder(order: Order): void {
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {
    // storage unavailable — order simply won't persist
  }
}

export function loadOrder(): Order | null {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

export function newOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 1296)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `OBFA-${stamp}${rand}`;
}
