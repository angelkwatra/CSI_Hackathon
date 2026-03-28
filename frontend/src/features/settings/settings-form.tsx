"use client";

import { motion } from "framer-motion";
import { Shield, Bell, Mail, Bot, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/use-app-store";
import { toast } from "sonner";

export function SettingsForm() {
  const settings = useAppStore((s) => s.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);

  const handleToggle = async (
    key: keyof typeof settings,
    label: string,
    value: boolean
  ) => {
    await updateSettings({ [key]: value });
    toast.success(`${label} ${value ? "enabled" : "disabled"}`);
  };

  return (
    <div className="space-y-6">
      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                  <Shield className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Privacy-First Mode</p>
                  <p className="text-xs text-muted-foreground">
                    Process all data locally, no external tracking
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.privacyMode}
                onCheckedChange={(v) =>
                  handleToggle("privacyMode", "Privacy mode", v)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                  <Bell className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Get alerts for high-impact activities and suggestions
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(v) =>
                  handleToggle("notifications", "Notifications", v)
                }
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
                  <Mail className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Gmail</p>
                  <p className="text-xs text-muted-foreground">
                    Track email activity and optimize attachments
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {settings.gmailConnected ? (
                  <Badge
                    variant="outline"
                    className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                  >
                    Connected
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      await updateSettings({ gmailConnected: true });
                      toast.success("Gmail connected successfully");
                    }}
                  >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Connect
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
                  <Bot className="h-4 w-4 text-violet-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">AI Tools</p>
                  <p className="text-xs text-muted-foreground">
                    Monitor AI API usage across ChatGPT, Claude, etc.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {settings.aiToolsConnected ? (
                  <Badge
                    variant="outline"
                    className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                  >
                    Connected
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      await updateSettings({ aiToolsConnected: true });
                      toast.success("AI tools connected successfully");
                    }}
                  >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  Carbon-oh-no
                </span>{" "}
                v1.0.0
              </p>
              <p>
                A digital carbon footprint tracker that helps you monitor and
                reduce the environmental impact of your online activities.
              </p>
              <p>
                Carbon estimates are based on average data center Power Usage
                Effectiveness (PUE) of 1.2 and regional grid carbon intensity.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
