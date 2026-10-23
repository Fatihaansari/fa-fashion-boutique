import { describe, expect, it } from "vitest";

import { computeTotals, FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-math";

describe("cart totals", () => {
  it("sums price x quantity across lines", () => {
    const totals = computeTotals([
      { price: 3290, qty: 1 },
      { price: 4490, qty: 2 },
    ]);
    expect(totals.subtotal).toBe(12270);
    expect(totals.total).toBe(totals.subtotal + totals.shipping);
  });

  it("charges flat shipping below the free-shipping threshold", () => {
    const totals = computeTotals([{ price: FREE_SHIPPING_THRESHOLD - 1, qty: 1 }]);
    expect(totals.shipping).toBe(FLAT_SHIPPING);
    expect(totals.total).toBe(FREE_SHIPPING_THRESHOLD - 1 + FLAT_SHIPPING);
  });

  it("gives free shipping at exactly the threshold and above", () => {
    expect(computeTotals([{ price: FREE_SHIPPING_THRESHOLD, qty: 1 }]).shipping).toBe(0);
    expect(computeTotals([{ price: FREE_SHIPPING_THRESHOLD, qty: 3 }]).shipping).toBe(0);
  });

  it("charges nothing for an empty cart", () => {
    expect(computeTotals([])).toEqual({ subtotal: 0, shipping: 0, total: 0 });
  });
});
