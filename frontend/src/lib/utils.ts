import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}

export function formatCarbon(kg: number): string {
  if (kg < 0.001) return `${(kg * 1_000_000).toFixed(1)}mg`;
  if (kg < 1) return `${(kg * 1000).toFixed(1)}g`;
  return `${kg.toFixed(2)}kg`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function getImpactColor(impact: string): string {
  switch (impact) {
    case "high":
      return "text-red-500 bg-red-500/10 border-red-500/20";
    case "medium":
      return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    case "low":
      return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    default:
      return "text-muted-foreground bg-muted";
  }
}

export function getActivityIcon(type: string): string {
  switch (type) {
    case "email":
      return "Mail";
    case "ai":
      return "Bot";
    case "storage":
      return "HardDrive";
    default:
      return "Activity";
  }
}
