"use server";

import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import type { AnalyticsEventMetadata, AnalyticsEventType } from "@/types/db";

const FALLBACK_PROJECT_ID = "default-project";
const PROJECT_ID =
  process.env.NEXT_PUBLIC_PROJECT_ID ??
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ??
  FALLBACK_PROJECT_ID;

/**
 * 日付を YYYY-MM-DD 形式で返す（ローカルタイムゾーン）
 */
function getDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * アナリティクスイベントを Firestore に記録する Server Action.
 * テンプレート状態（credentials 未設定）では Firestore を呼ばず静かにスキップ。
 * エラー時は UI を止めず静かに失敗（console.error のみ）。
 */
function normalizeSourceKey(source?: string): string | null {
  if (!source) {
    return null;
  }
  const trimmed = source.trim().toLowerCase();
  if (!trimmed) {
    return null;
  }
  return trimmed.replace(/[^a-z0-9_-]/g, "_").slice(0, 80);
}

export async function trackEvent(
  eventType: AnalyticsEventType,
  metadata?: AnalyticsEventMetadata
): Promise<void> {
  const hasCredentials = Boolean(process.env.FIREBASE_SERVICE_ACCOUNT);
  if (!hasCredentials || PROJECT_ID === FALLBACK_PROJECT_ID) {
    console.log("analytics invalid");
    return;
  }
  try {
    const date = getDateString();
    const docRef = adminDb
      .collection("projects")
      .doc(PROJECT_ID)
      .collection("analytics")
      .doc(date);

    const field: AnalyticsEventType = eventType;

    const update: Record<string, unknown> = {
      [field]: FieldValue.increment(1),
      lastUpdated: FieldValue.serverTimestamp(),
    };

    const sourceKey = normalizeSourceKey(metadata?.source);
    if (sourceKey) {
      update[`sources.${sourceKey}.${field}`] = FieldValue.increment(1);
    }

    await docRef.set(update, { merge: true });
  } catch (err) {
    // credentials 未設定・読み込み失敗時はテンプレート用に静かに扱う
    const isCredentialsError =
      err instanceof Error &&
      (err.message.includes("default credentials") ||
        err.message.includes("Could not load"));
    if (isCredentialsError) {
      console.log("analytics invalid");
    } else {
      console.error("[analytics] trackEvent failed:", err);
    }
  }
}
