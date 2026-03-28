"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, X, Minimize2, Maximize2 } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { formatCurrency, formatCarbon } from "@/lib/utils";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import { Activity as ActivityType, KPIData } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function LiveTracker() {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(true);
  const { activities, addActivity, isLiveTracking, setKPI } = useAppStore();

  // Connect to WebSocket for real-time activity updates from backend
  useEffect(() => {
    if (!isLiveTracking) return;

    const socket = connectSocket();

    socket.on("new-activity", (activity: ActivityType) => {
      addActivity({
        ...activity,
        timestamp: new Date(activity.timestamp),
      });
    });

    socket.on("kpi-update", (kpi: KPIData) => {
      setKPI(kpi);
    });

    return () => {
      socket.off("new-activity");
      socket.off("kpi-update");
      disconnectSocket();
    };
  }, [isLiveTracking, addActivity, setKPI]);

  if (!visible) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600"
        onClick={() => setVisible(true)}
      >
        <Activity className="h-5 w-5" />
      </motion.button>
    );
  }

  const latestActivities = activities.slice(0, 3);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 right-4 z-50 w-80 overflow-hidden rounded-xl border bg-card shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-emerald-500/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-semibold">Live Tracker</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setVisible(false)}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="max-h-48 space-y-1 overflow-y-auto p-3">
              {latestActivities.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-xs"
                >
                  <span className="truncate pr-2">{activity.description}</span>
                  <div className="flex shrink-0 gap-2 text-muted-foreground">
                    <span>{formatCurrency(activity.costINR)}</span>
                    <span>{formatCarbon(activity.carbonKg)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary bar */}
      <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground">
        <span>{activities.length} activities tracked</span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-emerald-500 hover:underline"
        >
          {expanded ? "Collapse" : "View details"}
        </button>
      </div>
    </motion.div>
  );
}
