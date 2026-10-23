import { act, beforeEach, render, screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";

import { CartProvider, useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";

function Probe() {
  const { items, count, totals, addItem, updateQty, removeItem } = useCart();
  return (
    <div>
      <span data-testid="count">{count}</span>
      <span data-testid="subtotal">{totals.subtotal}</span>
      <span data-testid="lines">{items.length}</span>
      <button
        onClick={() => addItem(getProduct("the-essential-oversized-shirt")!, "M", "White")}
      >
        add-shirt
      </button>
      <button onClick={() => addItem(getProduct("sage-satin-midi-dress")!, "S", "Sage")}>
        add-dress
      </button>
      <button onClick={() => updateQty(items[0]!.key, 3)}>qty-3</button>
      <button onClick={() => removeItem(items[0]!.key)}>remove-first</button>
    </div>
  );
}

describe("cart context", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds items, merges duplicate size/colour lines and computes totals", () => {
    render(
      <CartProvider>
        <Probe />
      </CartProvider>,
    );

    act(() => {
      screen.getByText("add-shirt").click();
      screen.getByText("add-shirt").click();
      screen.getByText("add-dress").click();
    });

    // Two identical shirt lines merge into one; dress is a separate line.
    expect(screen.getByTestId("lines").textContent).toBe("2");
    expect(screen.getByTestId("count").textContent).toBe("3");
    // 2 x 3290 + 1 x 4790
    expect(screen.getByTestId("subtotal").textContent).toBe("11370");
  });

  it("updates quantity and removes lines", () => {
    render(
      <CartProvider>
        <Probe />
      </CartProvider>,
    );

    act(() => {
      screen.getByText("add-shirt").click();
      screen.getByText("qty-3").click();
    });
    expect(screen.getByTestId("count").textContent).toBe("3");
    expect(screen.getByTestId("subtotal").textContent).toBe("9870");

    act(() => {
      screen.getByText("remove-first").click();
    });
    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.getByTestId("subtotal").textContent).toBe("0");
  });
});
