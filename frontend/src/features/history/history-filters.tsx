"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";
import { ActivityType } from "@/lib/types";
import { RotateCcw } from "lucide-react";

export function HistoryFilters() {
  const typeFilter = useAppStore((s) => s.activityTypeFilter);
  const setTypeFilter = useAppStore((s) => s.setActivityTypeFilter);
  const dateRange = useAppStore((s) => s.dateRange);
  const setDateRange = useAppStore((s) => s.setDateRange);

  const handleReset = () => {
    setTypeFilter("all");
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={typeFilter}
        onValueChange={(v) => setTypeFilter(v as ActivityType | "all")}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Activity type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="ai">AI Usage</SelectItem>
          <SelectItem value="storage">Storage</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <input
          type="date"
          className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          value={
            dateRange.from ? dateRange.from.toISOString().split("T")[0] : ""
          }
          onChange={(e) =>
            setDateRange({
              ...dateRange,
              from: e.target.value ? new Date(e.target.value) : undefined,
            })
          }
        />
        <span className="text-sm text-muted-foreground">to</span>
        <input
          type="date"
          className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          value={dateRange.to ? dateRange.to.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            setDateRange({
              ...dateRange,
              to: e.target.value ? new Date(e.target.value) : undefined,
            })
          }
        />
      </div>

      <Button variant="ghost" size="sm" onClick={handleReset}>
        <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
        Reset
      </Button>
    </div>
  );
}
