"use client";

import { useEffect } from "react";
import type { TrafficSource } from "@/types/db";

const STORAGE_KEY = "traffic_source";

function safeParseUrl(url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function getInitialTrafficSource(): TrafficSource {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") ?? undefined;
  const utmMedium = params.get("utm_medium") ?? undefined;
  const ref = params.get("ref") ?? undefined;

  if (utmSource || utmMedium || ref) {
    return {
      source: utmSource ?? ref,
      medium: utmMedium,
      ref,
    };
  }

  const referrer = document.referrer;
  if (referrer) {
    const referrerUrl = safeParseUrl(referrer);
    return {
      source: referrerUrl?.hostname ?? referrer,
      medium: "referrer",
      referrer,
    };
  }

  return { source: "direct", medium: "direct" };
}

/**
 * 初回アクセス時の流入元を sessionStorage に保存して維持する。
 */
export function AnalyticsSourceProvider() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) {
      return;
    }

    const payload = getInitialTrafficSource();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, []);

  return null;
}
