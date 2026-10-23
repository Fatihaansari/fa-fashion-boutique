import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";

import { QuantityStepper } from "@/components/quantity-stepper";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart-math";
import { formatPKR } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => [
    { title: "Your Cart — Outfit by FA" },
    {
      name: "description",
      content: "Review your bag, adjust quantities and check out — Outfit by FA.",
    },
    { property: "og:title", content: "Your Cart — Outfit by FA" },
    { property: "og:description", content: "Review your bag and check out." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  component: CartPage,
});

function CartPage() {
  const { items, hydrated, totals, updateQty, removeItem } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal);
  const progress = Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (!hydrated) {
    return <div className="mx-auto max-w-6xl px-4 py-24 text-sm text-muted-foreground">Loading your bag…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" strokeWidth={1.25} />
        <h1 className="mt-6 font-display text-4xl font-medium">Your bag is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The white shirt is waiting. Start with the bestsellers.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 bg-primary px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Shop the Collection <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <p className="eyebrow text-muted-foreground">Shopping Bag</p>
      <h1 className="mt-2 font-display text-4xl font-medium sm:text-5xl">Your Cart</h1>

      {/* Free-shipping progress */}
      <div className="mt-8 border border-border bg-card p-4 sm:p-5">
        <p className="text-sm" aria-live="polite">
          {remaining > 0 ? (
            <>
              You're <strong>{formatPKR(remaining)}</strong> away from free delivery.
            </>
          ) : (
            <>You've unlocked <strong>free delivery</strong>.</>
          )}
        </p>
        <div className="mt-3 h-1 w-full bg-muted" role="presentation">
          <div
            className="h-1 bg-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Items */}
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.key} className="flex gap-4 py-6 sm:gap-6">
              <Link
                to="/product/$slug"
                params={{ slug: item.slug }}
                className="block w-24 shrink-0 overflow-hidden bg-muted sm:w-32"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <Link
                      to="/product/$slug"
                      params={{ slug: item.slug }}
                      className="link-underline font-display text-xl font-medium leading-snug"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {item.color} · Size {item.size}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground tabular-nums">
                      {formatPKR(item.price)} each
                    </p>
                  </div>
                  <p className="shrink-0 font-semibold tabular-nums">
                    {formatPKR(item.price * item.qty)}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-4 pt-4">
                  <QuantityStepper
                    value={item.qty}
                    onChange={(next) => updateQty(item.key, next)}
                    min={0}
                    size="sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit border border-border bg-card p-6 sm:p-8 lg:sticky lg:top-36">
          <h2 className="font-display text-2xl font-medium">Order Summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium tabular-nums">{formatPKR(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="font-medium tabular-nums">
                {totals.shipping === 0 ? "Free" : formatPKR(totals.shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold tabular-nums">{formatPKR(totals.total)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-7 flex items-center justify-center gap-2 bg-primary px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Proceed to Checkout <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
          <Link
            to="/shop"
            className="mt-3 flex items-center justify-center px-8 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground"
          >
            Continue shopping
          </Link>
          <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            Cash on delivery available nationwide. Easy 7-day exchange on unworn pieces.
          </p>
        </aside>
      </div>
    </div>
  );
}
