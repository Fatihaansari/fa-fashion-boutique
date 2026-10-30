import { describe, expect, it } from "vitest";

import { buildSizingGrounding, findSizeChart, sizeCharts, type SizeChart } from "@/lib/size-charts";
import { getProduct } from "@/lib/products";

const shirt = getProduct("the-essential-oversized-shirt")!;

describe("sizing helper grounding", () => {
  it("passes only catalog facts the product actually lists", () => {
    const grounding = buildSizingGrounding(shirt);
    expect(grounding).toContain("The Essential Oversized Shirt");
    expect(grounding).toContain("Available sizes: XS, S, M, L, XL");
    // Real fit note from the catalog, not invented
    expect(grounding).toContain("size down for a classic fit");
  });

  it("states plainly when measurements are missing and forbids inventing them", () => {
    expect(sizeCharts).toEqual([]); // no real measurements provided yet
    const grounding = buildSizingGrounding(shirt);
    expect(grounding).toContain("No garment measurements are published");
    expect(grounding).toContain("NOT invent, estimate or approximate");
  });

  it("renders a published chart with its unit, sizes and measurements", () => {
    const chart: SizeChart = {
      scope: { type: "product", id: shirt.slug },
      unit: "inches",
      rows: [
        { size: "S", measurements: { bust: 38, shoulder: 17.5, length: 28 } },
        { size: "M", measurements: { bust: 40, shoulder: 18, length: 28.5 } },
      ],
      notes: ["Garment measurements."],
    };
    const grounding = buildSizingGrounding(shirt, [chart]);
    expect(findSizeChart(shirt, [chart])).toBe(chart);
    expect(grounding).toContain("Unit: inches");
    expect(grounding).toContain("S | 38 | 17.5 | 28");
    expect(grounding).toContain("Chart notes: Garment measurements.");
    // A published chart replaces the missing-data notice
    expect(grounding).not.toContain("No garment measurements are published");
  });
});
