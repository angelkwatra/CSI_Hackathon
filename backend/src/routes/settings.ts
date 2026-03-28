import { Router, Request, Response } from "express";
import { getStore } from "../data/store";
import { Settings } from "../types";

const router = Router();

/** GET /api/settings — Current settings */
router.get("/", (req: Request, res: Response) => {
  const { userId = "default" } = req.query as Record<string, string>;
  const store = getStore(userId);
  res.json(store.settings);
});

/** PATCH /api/settings — Update settings (partial) */
router.patch("/", (req: Request, res: Response) => {
  const { userId = "default" } = req.body;
  const store = getStore(userId);
  
  const allowed: (keyof Settings)[] = [
    "privacyMode",
    "notifications",
    "gmailConnected",
    "aiToolsConnected",
  ];

  const updates = { ...req.body };
  delete updates.userId;

  for (const key of Object.keys(updates)) {
    if (!allowed.includes(key as keyof Settings)) {
      res.status(400).json({ error: `Invalid setting: ${key}` });
      return;
    }
    if (typeof updates[key] !== "boolean") {
      res.status(400).json({ error: `${key} must be a boolean` });
      return;
    }
    (store.settings as unknown as Record<string, boolean>)[key] = updates[key];
  }

  res.json(store.settings);
});

export default router;
