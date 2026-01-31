"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/app/actions/analytics";

/**
 * マウント時および pathname 変更時に trackEvent('views') を1回だけ呼び出すクライアントコンポーネント。
 * layout に配置してアプリ全体で PV 計測を行う。
 */
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    void trackEvent("views");
  }, [pathname]);

  return null;
}
