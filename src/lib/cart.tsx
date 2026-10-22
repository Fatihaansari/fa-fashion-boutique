import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { computeTotals, type OrderTotals } from "@/lib/cart-math";
import type { Product } from "@/lib/products";

const STORAGE_KEY = "outfit-by-fa-cart-v1";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  count: number;
  totals: OrderTotals;
  addItem: (product: Product, size: string, color: string, qty?: number) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function lineKey(slug: string, size: string, color: string): string {
  return `${slug}|${size}|${color}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount (SSR-safe).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // ignore malformed data
    }
    setHydrated(true);
  }, []);

  // Persist on every change once hydrated.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Product, size: string, color: string, qty = 1) => {
      const key = lineKey(product.slug, size, color);
      setItems((prev) => {
        const existing = prev.find((item) => item.key === key);
        if (existing) {
          return prev.map((item) =>
            item.key === key ? { ...item, qty: Math.min(item.qty + qty, 10) } : item,
          );
        }
        return [
          ...prev,
          {
            key,
            slug: product.slug,
            name: product.name,
            image: product.image,
            price: product.price,
            size,
            color,
            qty,
          },
        ];
      });
    },
    [],
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) =>
            item.key === key ? { ...item, qty: Math.min(qty, 10) } : item,
          ),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    return {
      items,
      hydrated,
      count,
      totals: computeTotals(items),
      addItem,
      updateQty,
      removeItem,
      clear,
    };
  }, [items, hydrated, addItem, updateQty, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
