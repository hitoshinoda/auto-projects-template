/**
 * アナリティクスで記録するイベント種別
 */
export type AnalyticsEventType = "views" | "clicks" | "conversions";

/**
 * Firestore: projects/{projectId}/analytics/{date} のドキュメント型
 */
export interface AnalyticsDailyDoc {
  views: number;
  clicks: number;
  conversions: number;
  lastUpdated: { seconds: number; nanoseconds: number };
}

/**
 * User document schema in Firestore
 */
export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;

  // Subscription status
  isPro: boolean;
  subscriptionStatus:
    | "active"
    | "canceled"
    | "past_due"
    | "unpaid"
    | "trialing"
    | "incomplete"
    | "incomplete_expired"
    | "none";
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;

  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
