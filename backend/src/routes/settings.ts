import { Router, Request, Response } from "express";
import { settings } from "../data/store";
import { Settings } from "../types";

const router = Router();

/** GET /api/settings — Current settings */
router.get("/", (_req: Request, res: Response) => {
  res.json(settings);
});

/** PATCH /api/settings — Update settings (partial) */
router.patch("/", (req: Request, res: Response) => {
  const allowed: (keyof Settings)[] = [
    "privacyMode",
    "notifications",
    "gmailConnected",
    "aiToolsConnected",
  ];

  const updates = req.body;

  for (const key of Object.keys(updates)) {
    if (!allowed.includes(key as keyof Settings)) {
      res.status(400).json({ error: `Invalid setting: ${key}` });
      return;
    }
    if (typeof updates[key] !== "boolean") {
      res.status(400).json({ error: `${key} must be a boolean` });
      return;
    }
    (settings as unknown as Record<string, boolean>)[key] = updates[key];
  }

  res.json(settings);
});

export default router;
