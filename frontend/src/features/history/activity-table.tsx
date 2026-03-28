"use client";

import { motion } from "framer-motion";
import { Mail, Bot, HardDrive } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore } from "@/store/use-app-store";
import { formatCurrency, formatCarbon, formatDate } from "@/lib/utils";
import { ActivityType } from "@/lib/types";

const iconMap: Record<ActivityType, typeof Mail> = {
  email: Mail,
  ai: Bot,
  storage: HardDrive,
};

const labelMap: Record<ActivityType, string> = {
  email: "Email",
  ai: "AI",
  storage: "Storage",
};

const colorMap: Record<ActivityType, string> = {
  email: "text-blue-500 bg-blue-500/10",
  ai: "text-violet-500 bg-violet-500/10",
  storage: "text-emerald-500 bg-emerald-500/10",
};

export function ActivityTable() {
  const activityHistory = useAppStore((s) => s.activityHistory);
  const typeFilter = useAppStore((s) => s.activityTypeFilter);
  const dateRange = useAppStore((s) => s.dateRange);

  const filtered = activityHistory.filter((activity) => {
    if (typeFilter !== "all" && activity.type !== typeFilter) return false;
    if (dateRange.from && activity.timestamp < dateRange.from) return false;
    if (dateRange.to) {
      const endOfDay = new Date(dateRange.to);
      endOfDay.setHours(23, 59, 59, 999);
      if (activity.timestamp > endOfDay) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
        <p className="text-sm text-muted-foreground">
          No activities match your filters
        </p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Timestamp
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Activity
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Type
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Size / Tokens
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Cost (₹)
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                CO₂
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((activity, i) => {
              const Icon = iconMap[activity.type];
              const color = colorMap[activity.type];

              return (
                <motion.tr
                  key={activity.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b transition-colors hover:bg-muted/30"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {formatDate(activity.timestamp)}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {activity.description}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded ${color}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span>{labelMap[activity.type]}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-muted-foreground">
                    {activity.size}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Tooltip>
                      <TooltipTrigger>
                        {formatCurrency(activity.costINR)}
                      </TooltipTrigger>
                      <TooltipContent>
                        Based on cloud provider pricing estimates
                      </TooltipContent>
                    </Tooltip>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Tooltip>
                      <TooltipTrigger>
                        {formatCarbon(activity.carbonKg)}
                      </TooltipTrigger>
                      <TooltipContent>
                        Estimated using PUE and grid carbon intensity
                      </TooltipContent>
                    </Tooltip>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  );
}
