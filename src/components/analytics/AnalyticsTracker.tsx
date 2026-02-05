"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/actions";
import type { TrafficSource } from "@/types/db";

const STORAGE_KEY = "traffic_source";

function readTrafficSource(): TrafficSource | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return undefined;
  }
  try {
    return JSON.parse(raw) as TrafficSource;
  } catch {
    return undefined;
  }
}

/**
 * マウント時および pathname 変更時に trackEvent('views') を1回だけ呼び出すクライアントコンポーネント。
 * layout に配置してアプリ全体で PV 計測を行う。
 */
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const metadata = readTrafficSource();
    void trackEvent("views", metadata);
  }, [pathname]);

  return null;
}
