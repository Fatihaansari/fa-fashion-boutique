import { createFileRoute, Link } from "@tanstack/react-router";

import { ProductCard } from "@/components/product-card";
import { byCategory, categoryLabels, products, type CategorySlug } from "@/lib/products";

type ShopSearch = { category?: CategorySlug };

const categorySlugs = Object.keys(categoryLabels) as CategorySlug[];

function parseCategory(value: unknown): CategorySlug | undefined {
  if (typeof value === "string" && (categorySlugs as string[]).includes(value)) {
    return value as CategorySlug;
  }
  return undefined;
}

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const category = parseCategory(search["category"]);
    return category ? { category } : {};
  },
  head: () => ({
    meta: [
      { title: "Shop All — Outfit by FA" },
      {
        name: "description",
        content:
          "Shop the full Outfit by FA collection — oversized shirts, wide-leg jeans, dresses, knit sets and outerwear.",
      },
      { property: "og:title", content: "Shop All — Outfit by FA" },
      {
        property: "og:description",
        content:
          "Shop the full Outfit by FA collection — oversized shirts, wide-leg jeans, dresses, knit sets and outerwear.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category } = Route.useSearch();
  const items = category ? byCategory(category) : products;
  const heading = category ? categoryLabels[category] : "Shop All";

  const chips: { slug: CategorySlug | undefined; label: string }[] = [
    { slug: undefined, label: "All" },
    ...categorySlugs.map((slug) => ({ slug, label: categoryLabels[slug] })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <p className="eyebrow text-muted-foreground">The Collection</p>
      <h1 className="mt-2 font-display text-4xl font-medium sm:text-5xl">{heading}</h1>
      <p className="mt-3 max-w-lg text-sm text-muted-foreground">
        {category
          ? `Everything ${categoryLabels[category].toLowerCase()}, in the palette and fit our feed is known for.`
          : "Every piece, from the signature white shirt to the camel trench."}
      </p>

      <nav aria-label="Filter categories" className="mt-8 flex flex-wrap gap-2">
        {chips.map((chip) => {
          const active = chip.slug === category;
          return (
            <Link
              key={chip.label}
              to="/shop"
              search={chip.slug ? { category: chip.slug } : {}}
              className={`border px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/80 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {chip.label}
            </Link>
          );
        })}
      </nav>

      <p className="mt-8 text-xs text-muted-foreground" aria-live="polite">
        {items.length} {items.length === 1 ? "piece" : "pieces"}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {items.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}
