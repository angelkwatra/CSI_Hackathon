"use client";

import { useEffect } from "react";
import { Lightbulb, Loader2 } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { SuggestionsList } from "@/features/suggestions/suggestions-list";

export default function SuggestionsPage() {
  const fetchSuggestionsData = useAppStore((s) => s.fetchSuggestionsData);
  const loading = useAppStore((s) => s.loading);

  useEffect(() => {
    fetchSuggestionsData();
  }, [fetchSuggestionsData]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
          <Lightbulb className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Optimization Suggestions</h1>
          <p className="text-sm text-muted-foreground">
            Actionable recommendations to reduce your digital footprint
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <SuggestionsList />
      )}
    </div>
  );
}
