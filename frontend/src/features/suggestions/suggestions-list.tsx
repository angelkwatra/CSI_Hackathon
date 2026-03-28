"use client";

import { useState } from "react";
import { useAppStore } from "@/store/use-app-store";
import { SuggestionCard } from "./suggestion-card";
import { Button } from "@/components/ui/button";
import { ImpactLevel } from "@/lib/types";

type FilterType = "all" | ImpactLevel;

export function SuggestionsList() {
  const suggestions = useAppStore((s) => s.suggestions);
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered =
    filter === "all"
      ? suggestions
      : suggestions.filter((s) => s.impact === filter);

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "High Impact", value: "high" },
    { label: "Medium Impact", value: "medium" },
    { label: "Low Impact", value: "low" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground">
            No suggestions match this filter
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((suggestion, i) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
