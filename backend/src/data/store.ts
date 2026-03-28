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
  totalCostSaved: 1247.5,
  totalCO2Saved: 18.42,
  emailsOptimized: 342,
  aiUsageReduced: 28,
};

// ── Activities ───────────────────────────────────────
export const activities: Activity[] = [
  {
    id: generateId(),
    type: "email",
    description: "Email with 25MB attachment sent",
    size: "25MB",
    costINR: 0.12,
    carbonKg: 0.05,
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "ai",
    description: "AI prompt: 1200 tokens generated",
    size: "1200 tokens",
    costINR: 0.35,
    carbonKg: 0.008,
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Cloud backup: 500MB synced",
    size: "500MB",
    costINR: 0.08,
    carbonKg: 0.02,
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "email",
    description: "Newsletter batch: 150 emails sent",
    size: "3.2MB",
    costINR: 0.45,
    carbonKg: 0.06,
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "ai",
    description: "AI image generation: 1024x1024",
    size: "4096 tokens",
    costINR: 1.2,
    carbonKg: 0.025,
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Video file uploaded to cloud",
    size: "2.1GB",
    costINR: 0.65,
    carbonKg: 0.12,
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "email",
    description: "Reply-all chain: 45 recipients",
    size: "1.8MB",
    costINR: 0.22,
    carbonKg: 0.035,
    timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "ai",
    description: "Code completion: 800 tokens",
    size: "800 tokens",
    costINR: 0.18,
    carbonKg: 0.005,
    timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "email",
    description: "Marketing campaign: 500 emails",
    size: "12MB",
    costINR: 1.85,
    carbonKg: 0.18,
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "ai",
    description: "AI summarization: 3000 tokens",
    size: "3000 tokens",
    costINR: 0.72,
    carbonKg: 0.015,
    timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Database backup: 1.2GB",
    size: "1.2GB",
    costINR: 0.35,
    carbonKg: 0.08,
    timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "email",
    description: "Internal memo with PDF",
    size: "4.5MB",
    costINR: 0.06,
    carbonKg: 0.01,
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "ai",
    description: "AI translation: 2500 tokens",
    size: "2500 tokens",
    costINR: 0.55,
    carbonKg: 0.012,
    timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Photo library sync: 800MB",
    size: "800MB",
    costINR: 0.22,
    carbonKg: 0.045,
    timestamp: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "email",
    description: "Customer support reply",
    size: "0.5MB",
    costINR: 0.02,
    carbonKg: 0.004,
    timestamp: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "ai",
    description: "Chatbot conversation: 5000 tokens",
    size: "5000 tokens",
    costINR: 1.1,
    carbonKg: 0.032,
    timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Log files archived: 350MB",
    size: "350MB",
    costINR: 0.1,
    carbonKg: 0.015,
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "email",
    description: "Team standup notes",
    size: "0.2MB",
    costINR: 0.01,
    carbonKg: 0.002,
    timestamp: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "ai",
    description: "Document analysis: 8000 tokens",
    size: "8000 tokens",
    costINR: 2.4,
    carbonKg: 0.048,
    timestamp: new Date(Date.now() - 30 * 3600 * 1000).toISOString(),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Project files uploaded: 2.5GB",
    size: "2.5GB",
    costINR: 0.75,
    carbonKg: 0.14,
    timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
  },
];

// ── Time Series (last 7 days) ────────────────────────
export const timeSeries: TimeSeriesPoint[] = [
  { date: "Mon", cost: 42.3, carbon: 2.1 },
  { date: "Tue", cost: 38.7, carbon: 1.8 },
  { date: "Wed", cost: 55.2, carbon: 3.2 },
  { date: "Thu", cost: 47.8, carbon: 2.6 },
  { date: "Fri", cost: 61.4, carbon: 3.8 },
  { date: "Sat", cost: 29.1, carbon: 1.4 },
  { date: "Sun", cost: 33.5, carbon: 1.7 },
];

// ── Usage Distribution ───────────────────────────────
export const distribution: UsageDistribution[] = [
  { name: "Email", value: 45, color: "#3b82f6" },
  { name: "AI Usage", value: 35, color: "#8b5cf6" },
  { name: "Storage", value: 20, color: "#10b981" },
];

// ── Suggestions ──────────────────────────────────────
export const suggestions: Suggestion[] = [
  {
    id: generateId(),
    title: "Compress email attachments",
    description:
      "Enable automatic compression for attachments over 5MB. This can reduce email size by up to 60% without noticeable quality loss.",
    savingsINR: 15.5,
    savingsCO2: 2.3,
    impact: "high",
    category: "email",
    applied: false,
  },
  {
    id: generateId(),
    title: "Use AI response caching",
    description:
      "Cache frequently repeated AI prompts to avoid redundant API calls. Similar queries can reuse previous responses.",
    savingsINR: 28.0,
    savingsCO2: 1.8,
    impact: "high",
    category: "ai",
    applied: false,
  },
  {
    id: generateId(),
    title: "Clean up duplicate cloud files",
    description:
      "Found 2.3GB of duplicate files across your cloud storage. Removing duplicates saves storage costs and energy.",
    savingsINR: 8.2,
    savingsCO2: 0.95,
    impact: "medium",
    category: "storage",
    applied: false,
  },
  {
    id: generateId(),
    title: "Unsubscribe from inactive newsletters",
    description:
      "You have 23 newsletter subscriptions you haven't opened in 3+ months. Unsubscribing reduces unnecessary email processing.",
    savingsINR: 5.0,
    savingsCO2: 0.45,
    impact: "medium",
    category: "email",
    applied: false,
  },
  {
    id: generateId(),
    title: "Reduce AI model size for simple tasks",
    description:
      "Use smaller AI models for basic text tasks. GPT-3.5 uses 10x less energy than GPT-4 for simple completions.",
    savingsINR: 42.0,
    savingsCO2: 3.5,
    impact: "high",
    category: "ai",
    applied: false,
  },
  {
    id: generateId(),
    title: "Enable lazy-loading for cloud sync",
    description:
      "Switch to on-demand file sync instead of continuous background sync. Only download files when accessed.",
    savingsINR: 3.8,
    savingsCO2: 0.6,
    impact: "low",
    category: "storage",
    applied: false,
  },
];

// ── Sustainability Score ─────────────────────────────
export const sustainabilityScore = 74;

export const breakdown: SustainabilityBreakdown = {
  email: 78,
  ai: 62,
  storage: 85,
};

// ── Settings ─────────────────────────────────────────
export const settings: Settings = {
  privacyMode: false,
  notifications: true,
  gmailConnected: false,
  aiToolsConnected: false,
};
