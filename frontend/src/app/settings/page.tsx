"use client";

import { useEffect } from "react";
import { Settings } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { SettingsForm } from "@/features/settings/settings-form";

export default function SettingsPage() {
  const fetchSettingsData = useAppStore((s) => s.fetchSettingsData);

  useEffect(() => {
    fetchSettingsData();
  }, [fetchSettingsData]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Configure your tracking preferences and integrations
          </p>
        </div>
      </div>

      <SettingsForm />
    </div>
  );
}
