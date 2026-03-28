import {
  Activity,
  Suggestion,
  TimeSeriesPoint,
  UsageDistribution,
  KPIData,
  SustainabilityBreakdown,
} from "./types";
import { generateId } from "./utils";

// KPI summary data
export const kpiData: KPIData = {
  totalCostSaved: 1247.5,
  totalCO2Saved: 18.42,
  emailsOptimized: 342,
  aiUsageReduced: 28,
};

// Recent activities for the feed
export const recentActivities: Activity[] = [
  {
    id: generateId(),
    type: "email",
    description: "Email with 25MB attachment sent",
    size: "25MB",
    costINR: 0.12,
    carbonKg: 0.05,
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: generateId(),
    type: "ai",
    description: "AI prompt: 1200 tokens generated",
    size: "1200 tokens",
    costINR: 0.35,
    carbonKg: 0.008,
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Cloud backup: 500MB synced",
    size: "500MB",
    costINR: 0.08,
    carbonKg: 0.02,
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: generateId(),
    type: "email",
    description: "Newsletter batch: 150 emails sent",
    size: "3.2MB",
    costINR: 0.45,
    carbonKg: 0.06,
    timestamp: new Date(Date.now() - 18 * 60 * 1000),
  },
  {
    id: generateId(),
    type: "ai",
    description: "AI image generation: 1024x1024",
    size: "4096 tokens",
    costINR: 1.2,
    carbonKg: 0.025,
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Video file uploaded to cloud",
    size: "2.1GB",
    costINR: 0.65,
    carbonKg: 0.12,
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
  },
  {
    id: generateId(),
    type: "email",
    description: "Reply-all chain: 45 recipients",
    size: "1.8MB",
    costINR: 0.22,
    carbonKg: 0.035,
    timestamp: new Date(Date.now() - 42 * 60 * 1000),
  },
  {
    id: generateId(),
    type: "ai",
    description: "Code completion: 800 tokens",
    size: "800 tokens",
    costINR: 0.18,
    carbonKg: 0.005,
    timestamp: new Date(Date.now() - 55 * 60 * 1000),
  },
];

// Time series data for charts (last 7 days)
export const timeSeriesData: TimeSeriesPoint[] = [
  { date: "Mon", cost: 42.3, carbon: 2.1 },
  { date: "Tue", cost: 38.7, carbon: 1.8 },
  { date: "Wed", cost: 55.2, carbon: 3.2 },
  { date: "Thu", cost: 47.8, carbon: 2.6 },
  { date: "Fri", cost: 61.4, carbon: 3.8 },
  { date: "Sat", cost: 29.1, carbon: 1.4 },
  { date: "Sun", cost: 33.5, carbon: 1.7 },
];

// Usage distribution for pie chart
export const usageDistribution: UsageDistribution[] = [
  { name: "Email", value: 45, color: "#3b82f6" },
  { name: "AI Usage", value: 35, color: "#8b5cf6" },
  { name: "Storage", value: 20, color: "#10b981" },
];

// Optimization suggestions
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

// Full activity history
export const activityHistory: Activity[] = [
  ...recentActivities,
  {
    id: generateId(),
    type: "email",
    description: "Marketing campaign: 500 emails",
    size: "12MB",
    costINR: 1.85,
    carbonKg: 0.18,
    timestamp: new Date(Date.now() - 2 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "ai",
    description: "AI summarization: 3000 tokens",
    size: "3000 tokens",
    costINR: 0.72,
    carbonKg: 0.015,
    timestamp: new Date(Date.now() - 3 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Database backup: 1.2GB",
    size: "1.2GB",
    costINR: 0.35,
    carbonKg: 0.08,
    timestamp: new Date(Date.now() - 4 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "email",
    description: "Internal memo with PDF",
    size: "4.5MB",
    costINR: 0.06,
    carbonKg: 0.01,
    timestamp: new Date(Date.now() - 5 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "ai",
    description: "AI translation: 2500 tokens",
    size: "2500 tokens",
    costINR: 0.55,
    carbonKg: 0.012,
    timestamp: new Date(Date.now() - 6 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Photo library sync: 800MB",
    size: "800MB",
    costINR: 0.22,
    carbonKg: 0.045,
    timestamp: new Date(Date.now() - 8 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "email",
    description: "Customer support reply",
    size: "0.5MB",
    costINR: 0.02,
    carbonKg: 0.004,
    timestamp: new Date(Date.now() - 10 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "ai",
    description: "Chatbot conversation: 5000 tokens",
    size: "5000 tokens",
    costINR: 1.1,
    carbonKg: 0.032,
    timestamp: new Date(Date.now() - 12 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Log files archived: 350MB",
    size: "350MB",
    costINR: 0.1,
    carbonKg: 0.015,
    timestamp: new Date(Date.now() - 24 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "email",
    description: "Team standup notes",
    size: "0.2MB",
    costINR: 0.01,
    carbonKg: 0.002,
    timestamp: new Date(Date.now() - 26 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "ai",
    description: "Document analysis: 8000 tokens",
    size: "8000 tokens",
    costINR: 2.4,
    carbonKg: 0.048,
    timestamp: new Date(Date.now() - 30 * 3600 * 1000),
  },
  {
    id: generateId(),
    type: "storage",
    description: "Project files uploaded: 2.5GB",
    size: "2.5GB",
    costINR: 0.75,
    carbonKg: 0.14,
    timestamp: new Date(Date.now() - 48 * 3600 * 1000),
  },
];

// Sustainability score breakdown
export const sustainabilityBreakdown: SustainabilityBreakdown = {
  email: 78,
  ai: 62,
  storage: 85,
};

// Generate a random new activity for real-time simulation
export function generateRandomActivity(): Activity {
  const activities = [
    {
      type: "email" as const,
      descriptions: [
        "Email with 10MB attachment",
        "Reply-all to 20 recipients",
        "Newsletter sent to 100 subscribers",
        "Email with inline images",
        "Forwarded chain email",
      ],
      sizes: ["10MB", "2MB", "5MB", "3.5MB", "1.2MB"],
      costRange: [0.03, 0.5],
      carbonRange: [0.005, 0.08],
    },
    {
      type: "ai" as const,
      descriptions: [
        "AI prompt: 500 tokens",
        "AI code generation: 2000 tokens",
        "AI image analysis",
        "Chatbot response: 1500 tokens",
        "AI text summarization",
      ],
      sizes: ["500 tokens", "2000 tokens", "1024 tokens", "1500 tokens", "800 tokens"],
      costRange: [0.1, 1.5],
      carbonRange: [0.003, 0.03],
    },
    {
      type: "storage" as const,
      descriptions: [
        "File sync: 200MB",
        "Cloud backup initiated",
        "Document saved to drive",
        "Media files uploaded",
        "Cache cleared and rebuilt",
      ],
      sizes: ["200MB", "1GB", "50MB", "500MB", "150MB"],
      costRange: [0.02, 0.4],
      carbonRange: [0.01, 0.08],
    },
  ];

  const category = activities[Math.floor(Math.random() * activities.length)];
  const idx = Math.floor(Math.random() * category.descriptions.length);

  return {
    id: generateId(),
    type: category.type,
    description: category.descriptions[idx],
    size: category.sizes[idx],
    costINR:
      category.costRange[0] +
      Math.random() * (category.costRange[1] - category.costRange[0]),
    carbonKg:
      category.carbonRange[0] +
      Math.random() * (category.carbonRange[1] - category.carbonRange[0]),
    timestamp: new Date(),
  };
}
