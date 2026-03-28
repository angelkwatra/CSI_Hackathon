"use client";

import { useEffect } from "react";
import { History, Loader2 } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { ActivityTable } from "@/features/history/activity-table";
import { HistoryFilters } from "@/features/history/history-filters";

export default function HistoryPage() {
  const fetchActivityHistory = useAppStore((s) => s.fetchActivityHistory);
  const loading = useAppStore((s) => s.loading);
  const typeFilter = useAppStore((s) => s.activityTypeFilter);
  const dateRange = useAppStore((s) => s.dateRange);

  useEffect(() => {
    fetchActivityHistory();
  }, [fetchActivityHistory, typeFilter, dateRange]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
          <History className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Activity History</h1>
          <p className="text-sm text-muted-foreground">
            Complete log of your digital activities and their environmental
            impact
          </p>
        </div>
      </div>

      <HistoryFilters />

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <ActivityTable />
      )}
    </div>
  );
}
