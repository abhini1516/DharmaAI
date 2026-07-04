import { Router, type IRouter } from "express";
import {
  ListLawyersQueryParams,
  ListLawyersResponse,
  GetLawyerByIdParams,
  GetLawyerByIdResponse,
  MatchLawyersBody,
  MatchLawyersResponse,
} from "@workspace/api-zod";
import { getLawyersCollection } from "../lib/mongo";
import { getOpenRouterModel, OPENROUTER_FREE_MODEL } from "../lib/openrouter";

const router: IRouter = Router();

function toLawyerDto(doc: Record<string, unknown>) {
  const { _id, ...rest } = doc;
  return rest;
}

router.get("/lawyers", async (req, res) => {
  const query = ListLawyersQueryParams.parse(req.query);
  const collection = await getLawyersCollection();

  const filter: Record<string, unknown> = {};
  if (query.practiceArea) filter.practiceAreas = { $regex: query.practiceArea, $options: "i" };
  if (query.city) filter["location.city"] = { $regex: query.city, $options: "i" };
  if (query.language) filter.languages = { $regex: query.language, $options: "i" };
  if (query.minExperience !== undefined) filter.experienceYears = { $gte: query.minExperience };
  if (query.maxFee !== undefined) filter.hourlyFee = { $lte: query.maxFee };

  let sort: Record<string, 1 | -1> = { rating: -1 };
  if (query.sort === "feeAsc") sort = { hourlyFee: 1 };
  else if (query.sort === "feeDesc") sort = { hourlyFee: -1 };
  else if (query.sort === "experienceDesc") sort = { experienceYears: -1 };

  const docs = await collection.find(filter).sort(sort).toArray();
  const data = ListLawyersResponse.parse({
    lawyers: docs.map(toLawyerDto),
    total: docs.length,
  });
  res.json(data);
});

router.get("/lawyers/:id", async (req, res) => {
  const params = GetLawyerByIdParams.parse(req.params);
  const collection = await getLawyersCollection();
  const doc = await collection.findOne({ id: params.id });

  if (!doc) {
    res.status(404).json({ message: `No lawyer found with id ${params.id}` });
    return;
  }

  const data = GetLawyerByIdResponse.parse(toLawyerDto(doc));
  res.json(data);
});

router.post("/match", async (req, res) => {
  const body = MatchLawyersBody.parse(req.body);
  const collection = await getLawyersCollection();

  const filter: Record<string, unknown> = {};
  if (body.location) {
    filter.$or = [
      { "location.city": { $regex: body.location, $options: "i" } },
      { "location.state": { $regex: body.location, $options: "i" } },
    ];
  }
  if (body.practiceArea) filter.practiceAreas = { $regex: body.practiceArea, $options: "i" };
  if (body.maxBudget !== undefined) filter.hourlyFee = { $lte: body.maxBudget };
  if (body.languages && body.languages.length > 0) {
    filter.languages = { $in: body.languages };
  }

  let candidates = await collection.find(filter).toArray();
  if (candidates.length === 0) {
    candidates = await collection.find({}).toArray();
  }

  const candidateSummaries = candidates
    .map(
      (c, i) =>
        `${i}. ${c.name} — ${c.location.city}, ${c.location.state}. Practice areas: ${c.practiceAreas.join(", ")}. ${c.experienceYears} years experience. Fee: INR ${c.hourlyFee}/hr. Rating ${c.rating}. About: ${c.about}`,
    )
    .join("\n");

  const prompt = `You are the AI matchmaking engine for Dharma.ai, an Indian legal platform. A citizen described their case below. Rank the candidate lawyers by how well their background fits this specific case, as if performing a vector similarity search over their practice history.

Citizen's case: "${body.caseText}"

Candidate lawyers:
${candidateSummaries}

Return the top 5 (or fewer if fewer candidates exist) best-fit lawyers, ranked best first. For each, give a matchScore from 0-100 reflecting genuine relevance to this specific case (vary the scores realistically, don't just give everyone 90+), and a one-to-two sentence matchReasoning explaining specifically why that lawyer's background fits this case.

Respond ONLY with valid JSON in this exact shape, no markdown fences:
{"matches": [{"index": 0, "matchScore": 94, "matchReasoning": "..."}]}`;

  try {
    const completion = await getOpenRouterModel().create({
      model: OPENROUTER_FREE_MODEL,
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const raw = completion.choices[0]?.message?.content || "";

    let parsed: { matches?: { index: number; matchScore: number; matchReasoning: string }[] };
    try {
      parsed = JSON.parse(raw);
    } catch {
      req.log.warn({ raw }, "OpenRouter returned non-JSON match response");
      parsed = { matches: [] };
    }

    const ranked = (parsed.matches ?? [])
      .filter((m) => candidates[m.index])
      .map((m) => ({
        ...toLawyerDto(candidates[m.index]),
        matchScore: Math.max(0, Math.min(100, Math.round(m.matchScore))),
        matchReasoning: m.matchReasoning,
      }));

    const data = MatchLawyersResponse.parse({ matches: ranked });
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "OpenRouter match request failed");
    res.status(502).json({ message: "The AI matchmaking engine is temporarily unavailable. Please try again." });
  }
});

export default router;
