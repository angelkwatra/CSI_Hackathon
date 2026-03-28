"use client";

import { useEffect } from "react";
import { Gauge, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CircularScore } from "@/features/score/circular-score";
import { ScoreBreakdown } from "@/features/score/score-breakdown";
import { useAppStore } from "@/store/use-app-store";

export default function ScorePage() {
  const score = useAppStore((s) => s.sustainabilityScore);
  const fetchScoreData = useAppStore((s) => s.fetchScoreData);
  const loading = useAppStore((s) => s.loading);

  useEffect(() => {
    fetchScoreData();
  }, [fetchScoreData]);

  const rating =
    score >= 80
      ? "Excellent"
      : score >= 60
        ? "Good"
        : score >= 40
          ? "Needs Improvement"
          : "Critical";

  const ratingColor =
    score >= 80
      ? "text-emerald-500"
      : score >= 60
        ? "text-blue-500"
        : score >= 40
          ? "text-amber-500"
          : "text-red-500";

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
          <Gauge className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Sustainability Score</h1>
          <p className="text-sm text-muted-foreground">
            Your overall digital sustainability rating
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center py-10">
          <CircularScore score={score} size={220} strokeWidth={14} />
          <p className={`mt-4 text-lg font-semibold ${ratingColor}`}>
            {rating}
          </p>
          <p className="mt-1 max-w-md text-center text-sm text-muted-foreground">
            Your sustainability score is calculated from your email, AI usage,
            and storage efficiency. Apply suggestions to improve it.
          </p>
        </CardContent>
      </Card>

      <ScoreBreakdown />
    </div>
  );
}
