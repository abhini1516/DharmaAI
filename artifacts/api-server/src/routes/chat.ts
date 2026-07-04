import { Router, type IRouter } from "express";
import { AskLegalQuestionBody, AskLegalQuestionResponse } from "@workspace/api-zod";
import { getGeminiModel } from "../lib/gemini";
import { citationReferenceForPrompt } from "../data/citations";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are Dharma AI, a legal literacy assistant for the Republic of India. You answer questions about Indian law (Constitution, Bharatiya Nyaya Sanhita, Digital Personal Data Protection Act, Consumer Protection Act, Information Technology Act, and other central/national laws) in clear, plain language for ordinary citizens.

Rules:
- Answer the user's ACTUAL question directly and specifically. Never deflect to a generic or unrelated topic. If the question is about something not covered by the reference citations below, still answer it accurately using your general knowledge of Indian law, just without inventing a citation tag.
- When your answer relies on one of the statutes below, cite it inline using its exact bracket tag (e.g. [BNS-106]). Only use tags from this reference list — never invent a tag that isn't listed. It is fine to answer without any tag if none of these are directly relevant.
- Keep answers concise (roughly 3-6 sentences), warm, and non-judgmental. This is legal information, not formal legal advice — you can note that briefly when relevant, but don't repeat it every message.
- End your JSON response with exactly 3 short, specific suggestedFollowUps that a citizen in this situation would plausibly ask next.

Reference citations you may cite (tag — act, section: text):
${citationReferenceForPrompt}

Respond ONLY with valid JSON in this exact shape, no markdown fences:
{"text": "your answer with inline [TAG] citations where relevant", "suggestedFollowUps": ["...", "...", "..."]}`;

router.post("/chat", async (req, res) => {
  const body = AskLegalQuestionBody.parse(req.body);

  const history = (body.history ?? [])
    .map((m) => `${m.role === "user" ? "Citizen" : "Dharma AI"}: ${m.text}`)
    .join("\n");

  const contextLine = body.topicContext
    ? `\nThe citizen was just reading about: ${body.topicContext}.`
    : "";

  const prompt = `${SYSTEM_PROMPT}${contextLine}

${history ? `Conversation so far:\n${history}\n\n` : ""}Citizen's new question: "${body.message}"

Respond with the JSON now.`;

  try {
    const model = getGeminiModel("application/json");
    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    let parsed: { text?: string; suggestedFollowUps?: string[] };
    try {
      parsed = JSON.parse(raw);
    } catch {
      req.log.warn({ raw }, "Gemini returned non-JSON response, falling back to raw text");
      parsed = { text: raw, suggestedFollowUps: [] };
    }

    const data = AskLegalQuestionResponse.parse({
      text: parsed.text ?? "I couldn't generate a response. Please try rephrasing your question.",
      suggestedFollowUps: (parsed.suggestedFollowUps ?? []).slice(0, 3),
    });

    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Gemini chat request failed");
    res.status(502).json({ message: "The AI legal assistant is temporarily unavailable. Please try again." });
  }
});

export default router;
