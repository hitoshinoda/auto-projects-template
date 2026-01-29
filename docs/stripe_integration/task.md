# Task: Stripe Integration for Auto-Projects Template

## Goal
Make the `auto-projects-template` monetization-ready by integrating Stripe payment functionality.

## Todo List
- [ ] Install dependencies (`stripe`, `@stripe/stripe-js`) <!-- id: 1 -->
- [ ] Define User types with subscription status <!-- id: 2 -->
- [ ] Configure environment variables (`apphosting.yaml`, `.env.example`) <!-- id: 3 -->
- [ ] Implement Stripe initialization (`src/lib/stripe.ts`) <!-- id: 4 -->
- [ ] Create Auth Context with Firestore integration (`src/lib/firebase/auth-context.tsx`) <!-- id: 5 -->
- [ ] Create Checkout API Endpoint (`src/app/api/checkout/route.ts`) <!-- id: 6 -->
- [ ] Create Webhook API Endpoint (`src/app/api/webhook/route.ts`) <!-- id: 7 -->
- [ ] Create Upgrade Button Component (`src/components/shared/UpgradeButton.tsx`) <!-- id: 8 -->
- [ ] Create Protected Route Component (`src/components/shared/ProtectedRoute.tsx`) <!-- id: 9 -->
- [ ] Wrap application with Auth Provider <!-- id: 10 -->
