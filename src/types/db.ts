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
