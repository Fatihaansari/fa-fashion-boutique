import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";

import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/format";
import { newOrderId, saveOrder, type Order } from "@/lib/order";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Outfit by FA" },
      { name: "description", content: "Complete your order — cash on delivery or bank transfer." },
      { property: "og:title", content: "Checkout — Outfit by FA" },
      { property: "og:description", content: "Complete your order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  paymentMethod: "cod" | "bank-transfer";
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  notes: "",
  paymentMethod: "cod",
};

const requiredFields: (keyof FormState)[] = ["fullName", "phone", "email", "address", "city"];

function CheckoutPage() {
  const { items, hydrated, totals, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (!hydrated) {
    return <div className="mx-auto max-w-6xl px-4 py-24 text-sm text-muted-foreground">Loading checkout…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-medium">Nothing to check out</h1>
        <p className="mt-3 text-sm text-muted-foreground">Your bag is empty — add something lovely first.</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center justify-center bg-primary px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Shop the Collection
        </Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    for (const field of requiredFields) {
      if (!form[field].trim()) next[field] = "This field is required.";
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const order: Order = {
      id: newOrderId(),
      placedAt: new Date().toISOString(),
      items: items.map(({ slug, name, image, size, color, price, qty }) => ({
        slug,
        name,
        image,
        size,
        color,
        price,
        qty,
      })),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      customer: {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        paymentMethod: form.paymentMethod,
      },
    };
    saveOrder(order);
    clear();
    navigate({ to: "/order-confirmation" });
  };

  const fieldClass = (hasError: boolean) =>
    `w-full border bg-card px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring ${
      hasError ? "border-destructive" : "border-input"
    }`;

  const paymentOptions: { value: FormState["paymentMethod"]; title: string; copy: string }[] = [
    { value: "cod", title: "Cash on Delivery", copy: "Pay in cash when your parcel arrives." },
    {
      value: "bank-transfer",
      title: "Bank Transfer",
      copy: "Transfer details shared on WhatsApp after ordering.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <Link
        to="/cart"
        className="link-underline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Back to cart
      </Link>
      <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">Checkout</h1>

      <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <fieldset>
            <legend className="font-display text-2xl font-medium">Contact &amp; Delivery</legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="eyebrow mb-2 block text-muted-foreground">
                  Full name
                </label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  placeholder="Ayesha Khan"
                  className={fieldClass(!!errors.fullName)}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="eyebrow mb-2 block text-muted-foreground">
                  Phone (WhatsApp)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="0300 1234567"
                  className={fieldClass(!!errors.phone)}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="email" className="eyebrow mb-2 block text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                  className={fieldClass(!!errors.email)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="eyebrow mb-2 block text-muted-foreground">
                  Street address
                </label>
                <input
                  id="address"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="House 12, Street 4, Clifton Block 5"
                  className={fieldClass(!!errors.address)}
                  aria-invalid={!!errors.address}
                />
                {errors.address && <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.address}</p>}
              </div>
              <div>
                <label htmlFor="city" className="eyebrow mb-2 block text-muted-foreground">
                  City
                </label>
                <input
                  id="city"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="Karachi"
                  className={fieldClass(!!errors.city)}
                  aria-invalid={!!errors.city}
                />
                {errors.city && <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="notes" className="eyebrow mb-2 block text-muted-foreground">
                  Order notes (optional)
                </label>
                <input
                  id="notes"
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Gift wrap, size queries…"
                  className={fieldClass(false)}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-10">
            <legend className="font-display text-2xl font-medium">Payment</legend>
            <div className="mt-6 grid gap-3">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-start gap-4 border p-5 transition-colors ${
                    form.paymentMethod === opt.value
                      ? "border-foreground bg-secondary/60"
                      : "border-input bg-card hover:border-foreground/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.value}
                    checked={form.paymentMethod === opt.value}
                    onChange={() => set("paymentMethod", opt.value)}
                    className="mt-1 accent-[var(--color-primary)]"
                  />
                  <span>
                    <span className="block text-sm font-semibold">{opt.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{opt.copy}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Summary */}
        <aside className="h-fit border border-border bg-card p-6 sm:p-8 lg:sticky lg:top-36">
          <h2 className="font-display text-2xl font-medium">Your Order</h2>
          <ul className="mt-5 divide-y divide-border">
            {items.map((item) => (
              <li key={item.key} className="flex gap-3 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="aspect-[4/5] w-14 shrink-0 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.color} · {item.size} · ×{item.qty}
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
          <button
            type="submit"
            className="mt-7 flex w-full items-center justify-center gap-2 bg-primary px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Lock className="h-3.5 w-3.5" strokeWidth={1.5} /> Place Order
          </button>
          <p className="mt-4 text-center text-[0.7rem] text-muted-foreground">
            Demo checkout — no payment is taken and no order is fulfilled.
          </p>
        </aside>
      </form>
    </div>
  );
}
