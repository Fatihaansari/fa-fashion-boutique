import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Instagram, Menu, ShoppingBag, X } from "lucide-react";

import { useCart } from "@/lib/cart";
import { categories } from "@/lib/products";

const navLinks = [
  { to: "/shop", label: "Shop All" },
  ...categories.map((c) => ({ to: `/shop?category=${c.slug}` as const, label: c.label })),
];

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const go = (to: string) => {
    setOpen(false);
    navigate({ to });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <p className="eyebrow bg-primary px-4 py-2 text-center text-[0.6rem] text-primary-foreground sm:text-xs">
        Free delivery over Rs 6,000 · Cash on delivery, nationwide
      </p>

      {/* Mobile-first grid: menu / logo / cart */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-4 py-3 sm:flex sm:justify-between sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center sm:hidden">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center text-foreground"
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>

        <Link to="/" className="flex shrink-0 flex-col items-center leading-none sm:items-start">
          <span className="font-display text-2xl font-semibold tracking-[0.08em] text-foreground sm:text-[1.7rem]">
            OUTFIT <span className="italic font-medium">by</span> FA
          </span>
          <span className="eyebrow mt-0.5 text-[0.5rem] text-muted-foreground">Est. Karachi</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="link-underline text-[0.8rem] font-medium uppercase tracking-[0.18em] text-foreground/80 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 items-center justify-end gap-1 sm:gap-3">
          <a
            href="https://www.instagram.com/outfit__by_fa"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hidden h-10 w-10 place-items-center text-foreground/80 transition-colors hover:text-foreground sm:grid"
          >
            <Instagram className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.5} />
          </a>
          <Link
            to="/cart"
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative grid h-10 w-10 place-items-center text-foreground transition-colors hover:text-accent"
          >
            <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute right-1 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.6rem] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background px-4 pb-6 pt-2 lg:hidden">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => go(link.to)}
              className="block w-full border-b border-border/60 py-3 text-left text-sm font-medium uppercase tracking-[0.2em] text-foreground"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://www.instagram.com/outfit__by_fa"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Instagram className="h-4 w-4" /> @outfit__by_fa
          </a>
        </nav>
      )}
    </header>
  );
}
