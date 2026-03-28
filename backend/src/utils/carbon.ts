/**
 * Carbon and cost estimation utilities.
 *
 * Estimates are based on:
 * - Average data center PUE (Power Usage Effectiveness) of 1.2
 * - India grid carbon intensity: ~0.7 kg CO₂/kWh
 * - Cloud provider pricing benchmarks (AWS/GCP India regions)
 */

const PUE = 1.2;
const GRID_CARBON_INTENSITY = 0.7; // kg CO₂ per kWh

// Energy per unit (kWh)
const ENERGY_PER_MB_TRANSFER = 0.000005; // kWh per MB transferred
const ENERGY_PER_MB_STORAGE = 0.000001; // kWh per MB stored per hour
const ENERGY_PER_AI_TOKEN = 0.000003; // kWh per token (averaged across models)

// Cost per unit (INR)
const COST_PER_MB_TRANSFER = 0.005; // ₹ per MB
const COST_PER_MB_STORAGE = 0.001; // ₹ per MB stored
const COST_PER_AI_TOKEN = 0.0003; // ₹ per token

export function estimateEmailCarbon(sizeMB: number): number {
  const energy = sizeMB * ENERGY_PER_MB_TRANSFER * PUE;
  return energy * GRID_CARBON_INTENSITY;
}

export function estimateEmailCost(sizeMB: number): number {
  return sizeMB * COST_PER_MB_TRANSFER;
}

export function estimateAICarbon(tokens: number): number {
  const energy = tokens * ENERGY_PER_AI_TOKEN * PUE;
  return energy * GRID_CARBON_INTENSITY;
}

export function estimateAICost(tokens: number): number {
  return tokens * COST_PER_AI_TOKEN;
}

export function estimateStorageCarbon(sizeMB: number): number {
  const energy = sizeMB * ENERGY_PER_MB_STORAGE * PUE;
  return energy * GRID_CARBON_INTENSITY;
}

export function estimateStorageCost(sizeMB: number): number {
  return sizeMB * COST_PER_MB_STORAGE;
}

/** Parse size string like "25MB", "2.1GB", "1200 tokens" into numeric value */
export function parseSize(size: string): { value: number; unit: string } {
  const match = size.match(/([\d.]+)\s*(MB|GB|TB|tokens?)/i);
  if (!match) return { value: 0, unit: "unknown" };

  let value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  // Normalize to MB for storage/email, keep tokens for AI
  if (unit === "gb") value *= 1024;
  else if (unit === "tb") value *= 1024 * 1024;

  return { value, unit: unit.startsWith("token") ? "tokens" : "MB" };
}
