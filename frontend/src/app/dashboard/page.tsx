"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/use-app-store";
import { KPICards } from "@/features/dashboard/kpi-cards";
import { CostChart } from "@/features/dashboard/cost-chart";
import { CarbonChart } from "@/features/dashboard/carbon-chart";
import { UsagePieChart } from "@/features/dashboard/usage-pie-chart";
import { ActivityFeed } from "@/features/dashboard/activity-feed";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const fetchDashboardData = useAppStore((s) => s.fetchDashboardData);
  const loading = useAppStore((s) => s.loading);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Monitor your digital carbon footprint in real time
        </p>
      </div>

      <KPICards />

      <div className="grid gap-6 lg:grid-cols-2">
        <CostChart />
        <CarbonChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <UsagePieChart />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
