import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  size = "md",
  label = "Quantity",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
}) {
  const pad = size === "sm" ? "h-8 w-8 text-sm" : "h-10 w-10";
  return (
    <div
      className="inline-flex items-center border border-border bg-card"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${pad} grid place-items-center text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <span
        aria-live="polite"
        className={`${size === "sm" ? "w-8 text-sm" : "w-10"} text-center font-medium tabular-nums`}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`${pad} grid place-items-center text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
