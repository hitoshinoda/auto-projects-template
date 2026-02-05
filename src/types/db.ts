/**
 * アナリティクスで記録するイベント種別
 */
export type AnalyticsEventType =
  | "views"
  | "clicks"
  | "signup"
  | "checkout_start"
  | "subscription_success"
  | "active_usage";

/**
 * アナリティクスイベントの追加メタデータ
 */
export type AnalyticsEventMetadata = {
  source?: string;
  medium?: string;
  ref?: string;
  [key: string]: string | undefined;
};

/**
 * セッションに保存する流入元情報
 */
export type TrafficSource = {
  source?: string;
  medium?: string;
  ref?: string;
  referrer?: string;
};

/**
 * Firestore: projects/{projectId}/analytics/{date} のドキュメント型
 */
export interface AnalyticsDailyDoc {
  views: number;
  clicks: number;
  signup: number;
  checkout_start: number;
  subscription_success: number;
  active_usage: number;
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
