# Implementation Plan - Stripe Integration

This plan outlines the steps to integrate Stripe into the `auto-projects-template` to enable automatic monetization.

## 1. Environment & Dependencies
- **Task**: Install necessary packages and configure environment variables.
- **Actions**:
    - Run `npm install stripe @stripe/stripe-js`.
    - Update `.env.example` with `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
    - Update `apphosting.yaml` similarly.

## 2. Type Definitions
- **Task**: Define strict types for User data to avoid `any`.
- **File**: `src/types/db.ts` (Create new)
- **Content**:
    - `AppUser` interface extending Firebase User or similar, adding `isPro: boolean`, `subscriptionStatus: 'active' | 'inactive' | ...`, `stripeCustomerId?: string`.

## 3. Library Setup
- **Task**: Initialize Stripe backend client.
- **File**: `src/lib/stripe.ts`
- **Details**: Export typed Stripe instance using `STRIPE_SECRET_KEY`.

## 4. Authentication & State Management
- **Task**: Create a robust Auth Provider that syncs with Firestore.
- **File**: `src/lib/firebase/auth-context.tsx`
- **Details**:
    - Use `onAuthStateChanged`.
    - On login, subscribe to the user's Firestore document to get real-time subscription status.
    - Provide `user`, `loading`, `isPro` status via Context.
    - **Constraint**: No `any`, no non-null assertions.

## 5. Backend API Routes
### 5.1 Checkout Session
- **File**: `src/app/api/checkout/route.ts`
- **Details**:
    - POST request.
    - Verify user authentication (via Admin Auth or params).
    - Create Stripe Checkout Session.
    - `success_url` and `cancel_url` should dynamic or point to proper pages.
    - Return `sessionId`.

### 5.2 Webhook Handler
- **File**: `src/app/api/webhook/route.ts`
- **Details**:
    - POST request.
    - Verify Stripe Signature (`stripe.webhooks.constructEvent`).
    - Handle `checkout.session.completed`.
        - Retrieve `customer` and `subscription` details.
        - Update Firestore: Set `isPro: true`, `subscriptionStatus: 'active'`, save `stripeCustomerId`.
    - Handle `invoice.payment_succeeded` / `failed` (optional but good for robustness).

## 6. UI Components
### 6.1 Upgrade Button
- **File**: `src/components/shared/UpgradeButton.tsx`
- **Details**:
    - Button to trigger checkout.
    - Use `useCallback` for click handler.
    - Call `/api/checkout` and redirect to Stripe using `stripe-js`.

### 6.2 Protected Route
- **File**: `src/components/shared/ProtectedRoute.tsx`
- **Details**:
    - Wrapper component.
    - Check `isPro` status from AuthContext.
    - If not pro, show UpgradeButton or redirect.

## 7. Integration
- **File**: `src/app/layout.tsx`
- **Details**: Wrap children with `AuthProvider`.

## Verification Plan
- Build check: `npm run build`.
- Lint check: `npm run lint`.
- Type check: `npx tsc --noEmit`.
