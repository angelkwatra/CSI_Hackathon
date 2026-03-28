export type ActivityType = "email" | "ai" | "storage";

export type ImpactLevel = "high" | "medium" | "low";

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  size: string;
  costINR: number;
  carbonKg: number;
  timestamp: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  savingsINR: number;
  savingsCO2: number;
  impact: ImpactLevel;
  category: ActivityType;
  applied: boolean;
}

export interface TimeSeriesPoint {
  date: string;
  cost: number;
  carbon: number;
}

export interface UsageDistribution {
  name: string;
  value: number;
  color: string;
}

export interface KPIData {
  totalCostSaved: number;
  totalCO2Saved: number;
  emailsOptimized: number;
  aiUsageReduced: number;
}

export interface SustainabilityBreakdown {
  email: number;
  ai: number;
  storage: number;
}

export interface Settings {
  privacyMode: boolean;
  notifications: boolean;
  gmailConnected: boolean;
  aiToolsConnected: boolean;
}

export interface DashboardResponse {
  kpi: KPIData;
  timeSeries: TimeSeriesPoint[];
  distribution: UsageDistribution[];
  recentActivities: Activity[];
}

export interface ScoreResponse {
  score: number;
  breakdown: SustainabilityBreakdown;
}

export interface ActivityQuery {
  type?: ActivityType | "all";
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}
