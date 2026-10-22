import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

import { categories } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-2xl font-semibold tracking-[0.08em]">
            OUTFIT <span className="italic font-medium">by</span> FA
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Curated womenswear in quiet, wearable neutrals. Styled daily on Instagram, shipped nationwide.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/outfit__by_fa"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a
              href="mailto:hello@outfitbyfa.pk"
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <nav aria-label="Shop categories">
          <p className="eyebrow mb-4 text-muted-foreground">Shop</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/shop" className="link-underline text-foreground/80">
                All Products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/shop" search={{ category: c.slug }} className="link-underline text-foreground/80">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4 text-muted-foreground">Customer Care</p>
          <ul className="space-y-2.5 text-sm text-foreground/80">
            <li>Cash on delivery available</li>
            <li>Free delivery over Rs 6,000</li>
            <li>7-day easy exchange</li>
            <li>WhatsApp styling help</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-muted-foreground">Visit</p>
          <ul className="space-y-2.5 text-sm text-foreground/80">
            <li>Karachi, Pakistan</li>
            <li>Mon–Sat, 11am–8pm</li>
            <li>hello@outfitbyfa.pk</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Outfit by FA · Demo storefront — orders placed here are not fulfilled.
      </div>
    </footer>
  );
}
