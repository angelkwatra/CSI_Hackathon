export type ActivityType = "email" | "ai" | "storage";

export type ImpactLevel = "high" | "medium" | "low";

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  size: string; // e.g., "25MB" or "1200 tokens"
  costINR: number;
  carbonKg: number;
  timestamp: Date;
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

export interface KPIData {
  totalCostSaved: number;
  totalCO2Saved: number;
  emailsOptimized: number;
  aiUsageReduced: number;
}
