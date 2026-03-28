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
 * Multi-user in-memory data store. 
 * Groups all activity data by userId.
 */

interface UserStore {
  kpi: KPIData;
  activities: Activity[];
  timeSeries: TimeSeriesPoint[];
  distribution: UsageDistribution[];
  suggestions: Suggestion[];
  sustainabilityScore: number;
  breakdown: SustainabilityBreakdown;
  settings: Settings;
}

const userStores: Record<string, UserStore> = {};

const createInitialStore = (): UserStore => ({
  kpi: {
    totalCostSaved: 0,
    totalCO2Saved: 0,
    emailsOptimized: 0,
    aiUsageReduced: 0,
    searchesOptimized: 0,
  },
  activities: [],
  timeSeries: [
    { date: "Mon", cost: 0, carbon: 0 },
    { date: "Tue", cost: 0, carbon: 0 },
    { date: "Wed", cost: 0, carbon: 0 },
    { date: "Thu", cost: 0, carbon: 0 },
    { date: "Fri", cost: 0, carbon: 0 },
    { date: "Sat", cost: 0, carbon: 0 },
    { date: "Sun", cost: 0, carbon: 0 },
  ],
  distribution: [
    { name: "Email", value: 0, color: "#3b82f6" },
    { name: "AI Usage", value: 0, color: "#8b5cf6" },
    { name: "Storage", value: 0, color: "#10b981" },
    { name: "Search", value: 0, color: "#f59e0b" },
  ],
  suggestions: [],
  sustainabilityScore: 100,
  breakdown: {
    email: 0,
    ai: 0,
    storage: 0,
    search: 0,
  },
  settings: {
    privacyMode: false,
    notifications: true,
    gmailConnected: false,
    aiToolsConnected: false,
  },
});

/**
 * Get the data store for a specific user.
 * Creates a new one if it doesn't exist.
 */
export const getStore = (userId: string = "default"): UserStore => {
  if (!userStores[userId]) {
    userStores[userId] = createInitialStore();
  }
  return userStores[userId];
};

// Legacy exports for backward compatibility (reseeded with default store)
const defaultStore = getStore("default");
export const activities = defaultStore.activities;
export const kpi = defaultStore.kpi;
export const timeSeries = defaultStore.timeSeries;
export const distribution = defaultStore.distribution;
export const suggestions = defaultStore.suggestions;
export const sustainabilityScore = defaultStore.sustainabilityScore;
export const breakdown = defaultStore.breakdown;
export const settings = defaultStore.settings;
