import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getProduct } from "./products";
import { SizingHelperError, answerSizingQuestion } from "./sizing.server";

export type SizingHelperResponse = { ok: true; answer: string } | { ok: false; error: string };

function messageFor(error: unknown): string {
  const status =
    typeof error === "object" && error !== null && "statusCode" in error
      ? Number((error as { statusCode?: unknown }).statusCode)
      : undefined;

  if (status === 402) {
    return "The AI sizing helper has used up its monthly allowance — the store owner can top up Lovable AI credits to bring it back.";
  }
  if (status === 429) {
    return "The sizing helper is a little busy right now. Please try again in a moment.";
  }
  return "Sorry — the sizing helper couldn't answer just now. Please try again in a moment.";
}

export const askSizingHelper = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        slug: z.string().min(1),
        question: z.string().trim().min(3, "Please write a slightly longer question.").max(500),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<SizingHelperResponse> => {
    const product = getProduct(data.slug);
    if (!product) {
      return { ok: false, error: "This product could not be found." };
    }
    try {
      const answer = await answerSizingQuestion(product, data.question);
      return { ok: true, answer };
    } catch (error) {
      console.error("[sizing-helper] request failed:", error);
      if (error instanceof SizingHelperError) {
        return { ok: false, error: error.message };
      }
      return { ok: false, error: messageFor(error) };
    }
  });
