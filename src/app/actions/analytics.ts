"use server";

import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import type { AnalyticsEventType } from "@/types/db";

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
 * エラー時は UI を止めず静かに失敗（console.error のみ）。
 */
export async function trackEvent(eventType: AnalyticsEventType): Promise<void> {
  if (PROJECT_ID === FALLBACK_PROJECT_ID) {
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

    const field =
      eventType === "views"
        ? "views"
        : eventType === "clicks"
          ? "clicks"
          : "conversions";

    await docRef.set(
      {
        [field]: FieldValue.increment(1),
        lastUpdated: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error("[analytics] trackEvent failed:", err);
  }
}
