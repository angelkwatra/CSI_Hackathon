import { Router, Request, Response } from "express";
import { suggestions, kpi } from "../data/store";

const router = Router();

/** GET /api/suggestions — List all suggestions, optional impact filter */
router.get("/", (req: Request, res: Response) => {
  const { impact } = req.query as Record<string, string>;

  let result = [...suggestions];
  if (impact && impact !== "all") {
    result = result.filter((s) => s.impact === impact);
  }

  res.json(result);
});

/** PATCH /api/suggestions/:id/apply — Mark a suggestion as applied */
router.patch("/:id/apply", (req: Request, res: Response) => {
  const suggestion = suggestions.find((s) => s.id === req.params.id);

  if (!suggestion) {
    res.status(404).json({ error: "Suggestion not found" });
    return;
  }

  if (suggestion.applied) {
    res.status(409).json({ error: "Suggestion already applied" });
    return;
  }

  suggestion.applied = true;

  // Update KPIs with savings
  kpi.totalCostSaved += suggestion.savingsINR;
  kpi.totalCO2Saved += suggestion.savingsCO2;

  res.json({
    suggestion,
    updatedKPI: kpi,
  });
});

export default router;
