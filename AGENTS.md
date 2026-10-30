<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Storefront is frontend-only: cart persists in `localStorage` (`outfit-by-fa-cart-v1`), orders are demo data (`outfit-by-fa-last-order`). No Lovable Cloud tables are used.
- All cart/checkout money math must go through `computeTotals` in `src/lib/cart-math.ts` (single source of truth; free delivery ≥ Rs 6,000, flat Rs 250 below).
- Prices are stored in whole PKR in `src/lib/products.ts` and formatted only via `formatPKR`.
- Product imagery lives in `src/assets/` as ES6 imports; the brand logo is `src/assets/logo.png` (circular, also favicon in `public/favicon.png`). User-supplied product photos are CDN pointers (`src/assets/*.jpg.asset.json`) imported for their `.url`; never reupload or replace them.
- Catalog has no Dresses category (removed on request); categories are tops, bottoms, sets, outerwear.
- The AI Size & Fit helper (`src/lib/sizing.*`) answers only from `src/lib/products.ts` + `src/lib/size-charts.ts` via Lovable AI Gateway; it must clearly say when measurements are missing and never invent fit details. Add real measurements to `sizeCharts` in `src/lib/size-charts.ts` — nowhere else.

