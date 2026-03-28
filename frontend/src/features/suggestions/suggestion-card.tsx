"use client";

import { motion } from "framer-motion";
import { Mail, Bot, HardDrive, Search, Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Suggestion, ActivityType } from "@/lib/types";
import { formatCurrency, formatCarbon, getImpactColor } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import { toast } from "sonner";

const iconMap: Record<ActivityType, typeof Mail> = {
  email: Mail,
  ai: Bot,
  storage: HardDrive,
  search: Search,
};

interface SuggestionCardProps {
  suggestion: Suggestion;
  index: number;
}

export function SuggestionCard({ suggestion, index }: SuggestionCardProps) {
  const applySuggestion = useAppStore((s) => s.applySuggestion);
  const Icon = iconMap[suggestion.category];

  const handleApply = async () => {
    await applySuggestion(suggestion.id);
    toast.success(`Applied: ${suggestion.title}`, {
      description: `Saving ${formatCurrency(suggestion.savingsINR)} and ${formatCarbon(suggestion.savingsCO2)} CO₂`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className={`transition-all ${suggestion.applied ? "opacity-60" : "hover:shadow-md"}`}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{suggestion.title}</h3>
                <Badge
                  variant="outline"
                  className={getImpactColor(suggestion.impact)}
                >
                  {suggestion.impact.charAt(0).toUpperCase() +
                    suggestion.impact.slice(1)}{" "}
                  Impact
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {suggestion.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Save </span>
                  <span className="font-semibold text-blue-500">
                    {formatCurrency(suggestion.savingsINR)}
                  </span>
                  <span className="text-muted-foreground"> + </span>
                  <span className="font-semibold text-emerald-500">
                    {formatCarbon(suggestion.savingsCO2)} CO₂
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <Button
                  size="sm"
                  onClick={handleApply}
                  disabled={suggestion.applied}
                  className={
                    suggestion.applied
                      ? "bg-emerald-500/10 text-emerald-500"
                      : ""
                  }
                >
                  {suggestion.applied ? (
                    <>
                      <Check className="mr-1.5 h-3.5 w-3.5" />
                      Applied
                    </>
                  ) : (
                    <>
                      Apply
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
