import { categoryLabels, type Product } from "./products";

/**
 * Single source of truth for the AI sizing helper's garment measurements.
 *
 * TO ADD REAL MEASUREMENTS: append an entry to `sizeCharts` — one per product
 * or per category. The helper never invents numbers; it only answers from what
 * is listed here and in the catalog (src/lib/products.ts).
 *
 * Example:
 * {
 *   scope: { type: "product", id: "the-essential-oversized-shirt" },
 *   unit: "inches",
 *   rows: [
 *     { size: "S", measurements: { bust: 38, shoulder: 17.5, length: 28 } },
 *   ],
 *   notes: ["Garment measurements, taken flat and doubled at the bust."],
 * }
 */
export type MeasurementKey =
  | "bust"
  | "waist"
  | "hip"
  | "shoulder"
  | "length"
  | "inseam";

export type SizeChartRow = {
  size: string;
  measurements: Partial<Record<MeasurementKey, number>>;
};

export type SizeChart = {
  scope: { type: "product" | "category"; id: string };
  unit: "inches" | "cm";
  rows: SizeChartRow[];
  notes?: string[];
};

/** Empty until real measurements are provided — the helper says so plainly. */
export const sizeCharts: SizeChart[] = [];

const MEASUREMENT_LABELS: Record<MeasurementKey, string> = {
  bust: "Bust",
  waist: "Waist",
  hip: "Hip",
  shoulder: "Shoulder",
  length: "Length",
  inseam: "Inseam",
};

export function findSizeChart(product: Product, charts: SizeChart[] = sizeCharts): SizeChart | undefined {
  return (
    charts.find((c) => c.scope.type === "product" && c.scope.id === product.slug) ??
    charts.find((c) => c.scope.type === "category" && c.scope.id === product.category)
  );
}

function renderSizeChart(chart: SizeChart): string {
  const keys = [...new Set(chart.rows.flatMap((r) => Object.keys(r.measurements)))] as MeasurementKey[];
  const header = `Size | ${keys.map((k) => MEASUREMENT_LABELS[k]).join(" | ")}`;
  const lines = chart.rows.map(
    (row) =>
      `${row.size} | ${keys
        .map((k) => (row.measurements[k] === undefined ? "—" : String(row.measurements[k])))
        .join(" | ")}`,
  );
  const notes = chart.notes?.length ? `\nChart notes: ${chart.notes.join(" ")}` : "";
  return `Unit: ${chart.unit}\n${header}\n${lines.join("\n")}${notes}`;
}

const MISSING_MEASUREMENTS_NOTICE =
  "SIZE CHART DATA: No garment measurements are published for this product yet. " +
  "You must NOT invent, estimate or approximate any measurements, garment dimensions or body-size conversions. " +
  "If the question needs a measurement, say clearly that Outfit by FA has not published garment measurements for " +
  "this piece yet, then help with what IS listed below (fit notes, fabric, cut, available sizes) and suggest the " +
  "customer use their usual size or ask the boutique on WhatsApp.";

/**
 * Builds the grounding context for one sizing question. Pure and client-safe:
 * the AI model receives exactly this text plus the customer's question, so
 * every fact in an answer must come from this string.
 */
export function buildSizingGrounding(product: Product, charts: SizeChart[] = sizeCharts): string {
  const chart = findSizeChart(product, charts);
  const chartBlock = chart ? `SIZE CHART DATA (${product.name}):\n${renderSizeChart(chart)}` : MISSING_MEASUREMENTS_NOTICE;

  return [
    `PRODUCT CATALOG FACTS — ${product.name}:`,
    `Category: ${categoryLabels[product.category]}`,
    `Price: Rs ${product.price}`,
    `Available sizes: ${product.sizes.join(", ")}`,
    `Colours: ${product.colors.map((c) => c.name).join(", ")}`,
    product.badge ? `Badge: ${product.badge}` : null,
    `Description: ${product.description}`,
    `Product details: ${product.details.join(" | ")}`,
    chartBlock,
  ]
    .filter(Boolean)
    .join("\n");
}
