import { Router, Request, Response } from "express";
import { getStore } from "../data/store";
import { DashboardResponse } from "../types";

const router = Router();

/** GET /api/dashboard — KPIs, chart data, and recent activities */
router.get("/", (req: Request, res: Response) => {
  const { userId = "default" } = req.query as Record<string, string>;
  const store = getStore(userId);
  const response: DashboardResponse = {
    kpi: store.kpi,
    timeSeries: store.timeSeries,
    distribution: store.distribution,
    recentActivities: store.activities.slice(0, 8),
  };
  res.json(response);
});

/** GET /api/dashboard/kpi — KPI data only */
router.get("/kpi", (req: Request, res: Response) => {
  const { userId = "default" } = req.query as Record<string, string>;
  const store = getStore(userId);
  res.json(store.kpi);
});

/** GET /api/dashboard/charts — Time series + distribution */
router.get("/charts", (req: Request, res: Response) => {
  const { userId = "default" } = req.query as Record<string, string>;
  const store = getStore(userId);
  res.json({ timeSeries: store.timeSeries, distribution: store.distribution });
});

export default router;
