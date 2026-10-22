import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { useState, type FormEvent } from "react";

import { ProductCard } from "@/components/product-card";
import { heroImage, categories, getFeatured, getProduct } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Outfit by FA — Premium Women's Clothing" },
      {
        name: "description",
        content:
          "Premium, quiet-luxury womenswear: oversized shirts, wide-leg jeans, satin dresses and knit co-ord sets. Shop the collection from Outfit by FA.",
      },
      { property: "og:title", content: "Outfit by FA — Premium Women's Clothing" },
      {
        property: "og:description",
        content: "Oversized shirting, wide-leg denim and satin dresses in quiet neutrals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const primaryBtn =
  "inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90";
const outlineBtn =
  "inline-flex items-center justify-center gap-2 border border-foreground/30 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-secondary";

function Index() {
  const featured = getFeatured();
  const shirt = getProduct("the-essential-oversized-shirt");
  const jeans = getProduct("noir-wide-leg-jeans");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="grid lg:min-h-[calc(100vh-7rem)] lg:grid-cols-2">
        <div className="relative order-first lg:order-none">
          <img
            src={heroImage}
            alt="Model wearing the Essential Oversized Shirt with Noir Wide-Leg Jeans"
            width={1600}
            height={1072}
            className="h-full max-h-[70vh] w-full object-cover object-top lg:max-h-none"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 xl:px-24">
          <p className="eyebrow text-muted-foreground">New Collection · SS 2026</p>
          <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] sm:text-6xl xl:text-7xl">
            Quiet luxury,
            <br />
            <em className="font-medium italic">worn every day.</em>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Oversized shirting, wide-leg denim and fluid silhouettes — the pieces from our feed,
            made to be lived in.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/shop" className={primaryBtn}>
              Shop the Collection <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link to="/shop" search={{ category: "sets" }} className={outlineBtn}>
              New: Co-ord Sets
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-xs text-muted-foreground">
            <span>Free delivery over Rs 6,000</span>
            <span>Cash on delivery</span>
            <span>7-day exchange</span>
          </div>
        </div>
      </section>

      {/* Promise strip */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-10">
          {[
            { icon: Truck, title: "Nationwide Delivery", copy: "2–4 working days, COD available" },
            { icon: RefreshCcw, title: "Easy Exchange", copy: "7 days, no questions asked" },
            { icon: ShieldCheck, title: "Quality Checked", copy: "Every piece inspected by hand" },
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold tracking-wide">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-muted-foreground">The Edit</p>
            <h2 className="mt-2 font-display text-4xl font-medium sm:text-5xl">Shop by category</h2>
          </div>
          <Link to="/shop" className="link-underline text-sm font-semibold uppercase tracking-[0.18em]">
            View all
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug }}
              className="group relative block overflow-hidden bg-muted"
            >
              <img
                src={c.image}
                alt={c.label}
                width={1024}
                height={1280}
                loading="lazy"
                className="image-fade aspect-[3/4] w-full object-cover group-hover:scale-[1.05]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10 text-white">
                <p className="font-display text-xl font-medium">{c.label}</p>
                <p className="mt-0.5 text-[0.7rem] opacity-80">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-secondary/50 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <p className="eyebrow text-muted-foreground">Loved on the feed</p>
            <h2 className="mt-2 font-display text-4xl font-medium sm:text-5xl">Bestsellers</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Signature look */}
      {shirt && jeans && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="grid grid-cols-2 gap-4">
              <Link to="/product/$slug" params={{ slug: shirt.slug }} className="group block overflow-hidden bg-muted">
                <img
                  src={shirt.image}
                  alt={shirt.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="image-fade aspect-[4/5] w-full object-cover group-hover:scale-[1.04]"
                />
              </Link>
              <Link
                to="/product/$slug"
                params={{ slug: jeans.slug }}
                className="group mt-8 block overflow-hidden bg-muted"
              >
                <img
                  src={jeans.image}
                  alt={jeans.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="image-fade aspect-[4/5] w-full object-cover group-hover:scale-[1.04]"
                />
              </Link>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">The Signature Look</p>
              <h2 className="mt-2 font-display text-4xl font-medium leading-tight sm:text-5xl">
                The white shirt &amp; the wide-leg jean
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Two pieces, endless outfits. Our most-requested pairing — crisp cotton poplin over
                washed-black denim, exactly as seen on the feed.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/product/$slug" params={{ slug: shirt.slug }} className={primaryBtn}>
                  Shop the Shirt
                </Link>
                <Link to="/product/$slug" params={{ slug: jeans.slug }} className={outlineBtn}>
                  Shop the Jeans
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brand statement */}
      <section className="border-y border-border bg-card py-16 lg:py-20">
        <blockquote className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-3xl font-medium italic leading-snug sm:text-4xl">
            “Style is wearing the same white shirt a hundred ways — and making it look new each
            time.”
          </p>
          <footer className="eyebrow mt-6 text-muted-foreground">— FA, Founder</footer>
        </blockquote>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <p className="eyebrow text-muted-foreground">Stay in the loop</p>
        <h2 className="mt-2 font-display text-4xl font-medium">First look at every drop</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Restocks, new arrivals and styling notes — straight to your inbox.
        </p>
        {subscribed ? (
          <p className="mx-auto mt-8 max-w-sm border border-border bg-card px-6 py-4 text-sm font-medium">
            You're on the list — welcome to Outfit by FA.
          </p>
        ) : (
          <form onSubmit={onSubscribe} className="mx-auto mt-8 flex max-w-md gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border border-input bg-card px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring"
            />
            <button
              type="submit"
              className="shrink-0 bg-primary px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </>
  );
}
