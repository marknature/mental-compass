"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

export function CrisisSupport() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-border p-6">
      <div className="absolute inset-0 bg-grid-black/[0.02]" />

      <div className="relative space-y-4">
        <div className="space-y-2">
          <div className="mb-2 inline-flex items-center rounded-full bg-rose-100 px-3 py-2 text-xs font-medium text-destructive">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
            </span>
            Emergency Support
          </div>
          <h3 className="text-lg font-semibold tracking-tight">
            Need to talk to someone right now?
          </h3>
          <p className="text-sm text-muted-foreground">
            If you're experiencing a mental health crisis, don't hesitate to
            reach out. Professional support is available anytime. For immediate
            danger or life-threatening emergencies, please call 911 or visit
            your nearest emergency room.
          </p>
        </div>
        <div className="grid items-center gap-3 grid-cols-3">
          <Button size="sm">Call</Button>
          <Button size="sm">Book session</Button>
          <Button size="sm">Email</Button>
        </div>
      </div>
    </div>
  );
}
