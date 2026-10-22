export const FREE_SHIPPING_THRESHOLD = 6000;
export const FLAT_SHIPPING = 250;

export type PricedLine = { price: number; qty: number };

export type OrderTotals = {
  subtotal: number;
  shipping: number;
  total: number;
};

/**
 * Single source of truth for cart math.
 * - subtotal = sum(price * qty)
 * - shipping: free at/above the threshold, flat below, none for an empty cart
 */
export function computeTotals(items: PricedLine[]): OrderTotals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping =
    subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  return { subtotal, shipping, total: subtotal + shipping };
}
