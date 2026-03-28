import { Router, Request, Response } from "express";
import { kpi, timeSeries, distribution, activities } from "../data/store";
import { DashboardResponse } from "../types";

const router = Router();

/** GET /api/dashboard — KPIs, chart data, and recent activities */
router.get("/", (_req: Request, res: Response) => {
  const response: DashboardResponse = {
    kpi,
    timeSeries,
    distribution,
    recentActivities: activities.slice(0, 8),
  };
  res.json(response);
});

/** GET /api/dashboard/kpi — KPI data only */
router.get("/kpi", (_req: Request, res: Response) => {
  res.json(kpi);
});

/** GET /api/dashboard/charts — Time series + distribution */
router.get("/charts", (_req: Request, res: Response) => {
  res.json({ timeSeries, distribution });
});

export default router;
