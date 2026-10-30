import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";

import { createLovableAiGatewayRunIdFetch } from "./ai/run-id";
import { buildSizingGrounding } from "./size-charts";
import type { Product } from "./products";

const GATEWAY_URL = "https://ai.gateway.lovable.dev";
const MODEL = "openai/gpt-6-astra";

const SYSTEM_PROMPT = `You are the Size & Fit assistant for Outfit by FA, a women's clothing boutique in Karachi, Pakistan. You answer one customer question about how a specific garment fits.

GROUNDING RULES — these override everything else:
- Use ONLY the facts in the PRODUCT CATALOG FACTS and SIZE CHART DATA provided in the conversation. Quote or paraphrase them; do not add outside knowledge about brands, fabrics or sizing standards.
- NEVER invent, estimate or approximate measurements, garment dimensions, or "size X fits bust Y" claims. If the size chart data says measurements are not published, say so clearly and do not guess.
- NEVER claim a fabric content, care instruction or feature that is not listed.
- Recommending between listed sizes is allowed ONLY when the catalog's own fit notes support it (e.g. "oversized fit — size down for a classic fit" justifies suggesting sizing down). Cite the note you relied on.
- If the customer gives body measurements, you may not convert them to sizes without chart data — explain the measurements aren't published and invite them to share their usual size or ask on WhatsApp.
- If the question is not about sizing or fit, answer briefly that you can only help with size and fit questions.

STYLE: Warm, concise (under 120 words), plain English. Outfit by FA offers 7-day exchange, COD and WhatsApp styling help — you may mention these when relevant.`;

export async function answerSizingQuestion(product: Product, question: string): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    throw new SizingHelperError("The AI sizing helper is not configured yet.");
  }

  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: `${GATEWAY_URL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const messages: ModelMessage[] = [
    { role: "user", content: `${buildSizingGrounding(product)}\n\nCUSTOMER QUESTION: ${question}` },
  ];

  const result = streamText({
    model: provider.responses(MODEL),
    instructions: SYSTEM_PROMPT,
    messages,
    maxRetries: 0,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const text = (await result.text).trim();
  if (!text) {
    throw new SizingHelperError("The assistant could not answer that question. Please try again.");
  }
  return text;
}

export class SizingHelperError extends Error {}
