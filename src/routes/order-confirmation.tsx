import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Package, Truck } from "lucide-react";
import { useEffect, useState } from "react";

import { formatPKR } from "@/lib/format";
import { loadOrder, type Order } from "@/lib/order";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Outfit by FA" },
      { name: "description", content: "Thank you for your order — Outfit by FA." },
      { property: "og:title", content: "Order Confirmed — Outfit by FA" },
      { property: "og:description", content: "Thank you for your order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Read the demo order from localStorage after mount (SSR-safe).
  useEffect(() => {
    setOrder(loadOrder());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div className="mx-auto max-w-3xl px-4 py-24 text-sm text-muted-foreground">Loading…</div>;
  }

  if (!order) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-medium">No recent order</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Place an order from the shop and your confirmation will appear here.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center justify-center bg-primary px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Shop the Collection
        </Link>
      </div>
    );
  }

  const eta = new Date(order.placedAt);
  eta.setDate(eta.getDate() + 4);
  const etaLabel = eta.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/20">
          <Check className="h-7 w-7 text-accent" strokeWidth={2} />
        </span>
        <p className="eyebrow mt-6 text-muted-foreground">Order placed</p>
        <h1 className="mt-2 font-display text-4xl font-medium sm:text-5xl">
          Thank you, {order.customer.fullName.split(" ")[0]}!
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Your order <strong className="text-foreground">{order.id}</strong> is confirmed — a
          confirmation has been "sent" to {order.customer.email}. (Demo storefront: no real order
          was created.)
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-4 border border-border bg-card p-5">
          <Truck className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-semibold">Estimated delivery</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {etaLabel} · {order.customer.city}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 border border-border bg-card p-5">
          <Package className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-semibold">
              {order.customer.paymentMethod === "cod" ? "Pay on delivery" : "Bank transfer"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {order.customer.paymentMethod === "cod"
                ? "Keep the exact amount ready at your door."
                : "Transfer details shared on WhatsApp shortly."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-2xl font-medium">Order Summary</h2>
        <ul className="mt-5 divide-y divide-border">
          {order.items.map((item) => (
            <li key={`${item.slug}|${item.size}|${item.color}`} className="flex gap-4 py-4">
              <img
                src={item.image}
                alt={item.name}
                width={1024}
                height={1280}
                loading="lazy"
                className="aspect-[4/5] w-16 shrink-0 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.color} · Size {item.size} · Qty {item.qty}
                </p>
              </div>
              <p className="shrink-0 text-sm font-medium tabular-nums">
                {formatPKR(item.price * item.qty)}
              </p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-medium tabular-nums">{formatPKR(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Delivery</dt>
            <dd className="font-medium tabular-nums">
              {order.shipping === 0 ? "Free" : formatPKR(order.shipping)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base">
            <dt className="font-semibold">Total paid</dt>
            <dd className="font-semibold tabular-nums">{formatPKR(order.total)}</dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          Delivering to: {order.customer.address}, {order.customer.city} · {order.customer.phone}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          to="/shop"
          className="inline-flex items-center justify-center bg-primary px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continue Shopping
        </Link>
        <a
          href="https://www.instagram.com/outfit__by_fa"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center border border-foreground/30 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-secondary"
        >
          Follow @outfit__by_fa
        </a>
      </div>
    </div>
  );
}
