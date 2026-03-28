import { generateId } from "../utils/helpers";
import {
  Activity,
  Suggestion,
  TimeSeriesPoint,
  UsageDistribution,
  KPIData,
  SustainabilityBreakdown,
  Settings,
} from "../types";

/**
 * In-memory data store. In production this would be replaced
 * with a database (PostgreSQL, MongoDB, etc.).
 */

// ── KPI ──────────────────────────────────────────────
export const kpi: KPIData = {
  totalCostSaved: 0,
  totalCO2Saved: 0,
  emailsOptimized: 0,
  aiUsageReduced: 0,
  searchesOptimized: 0,
};

// ── Activities ───────────────────────────────────────
export const activities: Activity[] = [];

// ── Time Series (last 7 days) ────────────────────────
export const timeSeries: TimeSeriesPoint[] = [
  { date: "Mon", cost: 0, carbon: 0 },
  { date: "Tue", cost: 0, carbon: 0 },
  { date: "Wed", cost: 0, carbon: 0 },
  { date: "Thu", cost: 0, carbon: 0 },
  { date: "Fri", cost: 0, carbon: 0 },
  { date: "Sat", cost: 0, carbon: 0 },
  { date: "Sun", cost: 0, carbon: 0 },
];

// ── Usage Distribution ───────────────────────────────
export const distribution: UsageDistribution[] = [
  { name: "Email", value: 0, color: "#3b82f6" },
  { name: "AI Usage", value: 0, color: "#8b5cf6" },
  { name: "Storage", value: 0, color: "#10b981" },
  { name: "Search", value: 0, color: "#f59e0b" },
];

// ── Suggestions ──────────────────────────────────────
export const suggestions: Suggestion[] = [];

// ── Sustainability Score ─────────────────────────────
export const sustainabilityScore = 100;

export const breakdown: SustainabilityBreakdown = {
  email: 0,
  ai: 0,
  storage: 0,
};

// ── Settings ─────────────────────────────────────────
export const settings: Settings = {
  privacyMode: false,
  notifications: true,
  gmailConnected: false,
  aiToolsConnected: false,
};
