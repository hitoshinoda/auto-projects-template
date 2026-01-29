# Walkthrough - Stripe Integration

This document records the changes made during the Stripe integration process.

## Changes

### Dependencies
- [x] Installed `stripe` and `@stripe/stripe-js`.

### Configuration
- [x] Updated `.env.example` with Stripe keys.
- [x] Updated `apphosting.yaml` with Stripe keys.
- [x] Updated `src/lib/firebase/config.ts` with dummy fallback values for build safety.

### Types
- [x] Created `src/types/db.ts` with `AppUser` interface.

### Libraries
- [x] Created `src/lib/stripe.ts` for Stripe backend client.
- [x] Created `src/lib/firebase/auth-context.tsx` for managing user state and subscription status.

### API Routes
- [x] Created `src/app/api/checkout/route.ts` for creating Checkout Sessions.
- [x] Created `src/app/api/webhook/route.ts` for handling Stripe webhooks (subscription updates).

### Components
- [x] Created `src/components/shared/UpgradeButton.tsx`.
- [x] Created `src/components/shared/ProtectedRoute.tsx`.

### Application Entry
- [x] Updated `src/app/layout.tsx` to wrap the app with `AuthProvider`.

## Integration Notes for Controller (Auto-Projects)
When generating new projects using this template, the controller must:
1. Dynamically generate a Stripe Product/Price ID or Restrict API Key.
2. Inject the following environment variables into the new project:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
