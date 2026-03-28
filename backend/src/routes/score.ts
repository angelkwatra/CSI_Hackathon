import { Router, Request, Response } from "express";
import { sustainabilityScore, breakdown } from "../data/store";
import { ScoreResponse } from "../types";

const router = Router();

/** GET /api/score — Sustainability score + breakdown */
router.get("/", (_req: Request, res: Response) => {
  const response: ScoreResponse = {
    score: sustainabilityScore,
    breakdown,
  };
  res.json(response);
});

export default router;
