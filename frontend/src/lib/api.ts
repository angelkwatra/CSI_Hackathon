import {
  Activity,
  Suggestion,
  KPIData,
  TimeSeriesPoint,
  UsageDistribution,
  Settings,
  SustainabilityBreakdown,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ── Generic fetch helper ─────────────────────────────

async function fetchJSON<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `API error: ${res.status}`);
  }

  return res.json();
}

// ── Dashboard ────────────────────────────────────────

interface DashboardResponse {
  kpi: KPIData;
  timeSeries: TimeSeriesPoint[];
  distribution: UsageDistribution[];
  recentActivities: Activity[];
}

export function fetchDashboard(): Promise<DashboardResponse> {
  return fetchJSON("/api/dashboard");
}

export function fetchKPI(): Promise<KPIData> {
  return fetchJSON("/api/dashboard/kpi");
}

// ── Activities ───────────────────────────────────────

interface ActivitiesResponse {
  data: Activity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function fetchActivities(params?: {
  type?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}): Promise<ActivitiesResponse> {
  const query = new URLSearchParams();
  if (params?.type && params.type !== "all") query.set("type", params.type);
  if (params?.from) query.set("from", params.from);
  if (params?.to) query.set("to", params.to);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  const qs = query.toString();
  return fetchJSON(`/api/activities${qs ? `?${qs}` : ""}`);
}

// ── Suggestions ──────────────────────────────────────

export function fetchSuggestions(impact?: string): Promise<Suggestion[]> {
  const qs = impact && impact !== "all" ? `?impact=${impact}` : "";
  return fetchJSON(`/api/ai-suggestions${qs}`);
}

interface ApplySuggestionResponse {
  suggestion: Suggestion;
  updatedKPI: KPIData;
}

export function applySuggestionAPI(id: string): Promise<ApplySuggestionResponse> {
  return fetchJSON(`/api/suggestions/${id}/apply`, { method: "PATCH" });
}

// ── Score ────────────────────────────────────────────

interface ScoreResponse {
  score: number;
  breakdown: SustainabilityBreakdown;
}

export function fetchScore(): Promise<ScoreResponse> {
  return fetchJSON("/api/score");
}

// ── Settings ─────────────────────────────────────────

export function fetchSettings(): Promise<Settings> {
  return fetchJSON("/api/settings");
}

export function updateSettingsAPI(
  partial: Partial<Settings>
): Promise<Settings> {
  return fetchJSON("/api/settings", {
    method: "PATCH",
    body: JSON.stringify(partial),
  });
}

// ── Calculate ────────────────────────────────────────

interface CalculateResponse {
  type: string;
  size: string;
  parsed: { value: number; unit: string };
  costINR: number;
  carbonKg: number;
}

export function calculateImpact(
  type: string,
  size: string
): Promise<CalculateResponse> {
  return fetchJSON("/api/calculate", {
    method: "POST",
    body: JSON.stringify({ type, size }),
  });
}
