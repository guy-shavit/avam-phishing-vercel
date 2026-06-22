"use client";

import { useEffect } from "react";

type VisitTrackerProps = {
  campaign: string;
  unit: string;
};

export default function VisitTracker({ campaign, unit }: VisitTrackerProps) {
  useEffect(() => {
    fetch("/api/visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ campaign, unit }),
    });
  }, [campaign, unit]);

  return null;
}