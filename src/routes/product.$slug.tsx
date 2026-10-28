import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect, useState } from "react";

import { QuantityStepper } from "@/components/quantity-stepper";
import { ProductCard } from "@/components/product-card";
import { SizingHelper } from "@/components/sizing-helper";
import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/format";
import { categoryLabels, getProduct, related } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.product) {
      return {
        meta: [{ title: "Product unavailable — Outfit by FA" }, { name: "robots", content: "noindex" }],
      };
    }
    const { name, description } = loaderData.product;
    const title = `${name} — Outfit by FA`;
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 3500);
    return () => clearTimeout(t);
  }, [added]);

  const onAdd = () => {
    if (!size) {
      setError("Please select a size first.");
      return;
    }
    setError(null);
    addItem(product, size, color, qty);
    setAdded(true);
  };

  const relatedItems = related(product);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <Link
        to="/shop"
        search={{ category: product.category }}
        className="link-underline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Back to {categoryLabels[product.category]}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden bg-muted lg:sticky lg:top-36 lg:self-start">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">{categoryLabels[product.category]}</p>
          <h1 className="mt-2 font-display text-4xl font-medium leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-xl font-semibold tabular-nums">{formatPKR(product.price)}</p>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Color */}
          <fieldset className="mt-8">
            <legend className="eyebrow text-muted-foreground">
              Colour — <span className="text-foreground">{color}</span>
            </legend>
            <div className="mt-3 flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  onClick={() => setColor(c.name)}
                  className={`grid h-9 w-9 place-items-center rounded-full border-2 transition-colors ${
                    color === c.name ? "border-foreground" : "border-transparent hover:border-border"
                  }`}
                >
                  <span
                    className="h-7 w-7 rounded-full border border-border"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              ))}
            </div>
          </fieldset>

          {/* Size */}
          <fieldset className="mt-7">
            <legend className="eyebrow text-muted-foreground">Size</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => {
                    setSize(s);
                    setError(null);
                  }}
                  className={`min-w-12 border px-4 py-3 text-sm font-medium transition-colors ${
                    size === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-foreground/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {error && (
              <p className="mt-3 text-xs font-semibold text-destructive" role="alert">
                {error}
              </p>
            )}
          </fieldset>

          {/* Qty + Add to cart */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper value={qty} onChange={setQty} />
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex flex-1 items-center justify-center gap-2 bg-primary px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90 sm:flex-none sm:px-12"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" strokeWidth={2} /> Added to Cart
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
          {added && (
            <p className="mt-3 text-xs text-muted-foreground">
              Your bag has been updated —{" "}
              <Link to="/cart" className="link-underline font-semibold text-foreground">
                view cart &amp; checkout
              </Link>
            </p>
          )}

          <SizingHelper productSlug={product.slug} />


          {/* Details */}
          <div className="mt-10 border-t border-border pt-8">
            <p className="eyebrow text-muted-foreground">Details</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {product.details.map((d) => (
                <li key={d} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:grid-cols-2">
              <p>Free delivery over Rs 6,000 · COD available</p>
              <p>7-day exchange · WhatsApp styling help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-20 border-t border-border pt-14">
        <h2 className="font-display text-3xl font-medium sm:text-4xl">You may also like</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {relatedItems.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
