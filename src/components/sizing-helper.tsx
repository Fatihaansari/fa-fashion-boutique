import { Loader2, Ruler, Send } from "lucide-react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { askSizingHelper } from "@/lib/sizing.functions";

const SUGGESTIONS = [
  "Is this true to size?",
  "I'm between sizes — which should I pick?",
  "How does the fabric and cut fit?",
];

const DISCLAIMER =
  "Answers come only from this product's listed details and size chart. Garment measurements aren't published yet — the assistant will say so instead of guessing.";

export function SizingHelper({ productSlug }: { productSlug: string }) {
  const ask = useServerFn(askSizingHelper);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const submit = async (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 3 || status === "loading") return;
    setStatus("loading");
    setError("");
    const res = await ask({ data: { slug: productSlug, question: trimmed } });
    if (res.ok) {
      setAnswer(res.answer);
      setStatus("done");
    } else {
      setError(res.error);
      setStatus("error");
    }
  };

  return (
    <section aria-label="Size and fit help" className="mt-8 border border-border bg-card">
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
        <Ruler className="h-4 w-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="eyebrow">Size &amp; fit help</h2>
        <span className="ml-auto text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          AI-powered
        </span>
      </div>

      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              disabled={status === "loading"}
              onClick={() => {
                setQuestion(s);
                void submit(s);
              }}
              className="border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void submit(question);
          }}
        >
          <label className="sr-only" htmlFor="sizing-question">
            Ask a size or fit question
          </label>
          <input
            id="sizing-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. I usually wear M — will this fit me?"
            maxLength={500}
            className="min-w-0 flex-1 border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/50"
          />
          <button
            type="submit"
            disabled={status === "loading" || question.trim().length < 3}
            aria-label="Ask the sizing helper"
            className="inline-flex items-center justify-center bg-primary px-4 py-2.5 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </form>

        {status === "error" && (
          <p role="alert" className="mt-3 text-xs font-semibold text-destructive">
            {error}
          </p>
        )}

        {status === "done" && (
          <div className="mt-4 border-l-2 border-accent bg-background px-4 py-3">
            <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{answer}</p>
          </div>
        )}

        <p className="mt-3 text-[0.7rem] leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
      </div>
    </section>
  );
}
