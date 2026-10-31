import { Link } from "@tanstack/react-router";

import { formatPKR } from "@/lib/format";
import { categoryLabels, type Product } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
      preload="intent"
    >
      <div className="relative overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          width={1024}
          height={1280}
          loading={priority ? "eager" : "lazy"}
          className="image-fade aspect-[4/5] w-full object-cover group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="eyebrow absolute left-3 top-3 bg-card/90 px-2.5 py-1.5 text-[0.55rem] text-foreground">
            {product.badge}
          </span>
        )}
        <span className="absolute inset-x-3 bottom-3 translate-y-2 bg-card/95 py-2.5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View Product
        </span>
      </div>
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow text-[0.55rem] text-muted-foreground">{categoryLabels[product.category]}</p>
          <h3 className="mt-1 line-clamp-2 min-h-[2lh] font-display text-lg font-medium leading-snug">
            {product.name}
          </h3>
        </div>
        <p className="shrink-0 pt-4 text-sm font-semibold tabular-nums">{formatPKR(product.price)}</p>
      </div>
      <div className="mt-1.5 flex gap-1.5" aria-hidden="true">
        {product.colors.map((c) => (
          <span
            key={c.name}
            title={c.name}
            className="h-3 w-3 rounded-full border border-border"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </Link>
  );
}
