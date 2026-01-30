# Implementation Plan - Firebase Authentication

## 1. Setup & Configuration

- [x] **Verify `src/types/db.ts`**: Ensure `AppUser` interface is correct.
- [x] **Create `src/proxy.ts`**: Define redirect helper functions or constants.

## 2. Review & Update Auth Context

- [x] **Update `src/lib/firebase/auth-context.tsx`**:
  - Ensure Firestore instance uses `NEXT_PUBLIC_FIREBASE_DATABASE_ID`.
  - Verify user document creation logic.

## 3. Create Authentication Pages

- [x] **Signup Page (`src/app/(auth)/signup/page.tsx`)**:
  - Implement Email/Password sign up form.
  - Implement Google Sign-in button.
  - Handle success/error states.
  - Trigger email verification.
- [x] **Login Page (`src/app/(auth)/login/page.tsx`)**:
  - Implement Email/Password login form.
  - Implement Google Sign-in button.
  - Handle success/error states.
- [x] **Forgot Password Page (`src/app/(auth)/forgot-password/page.tsx`)**:
  - Input for email.
  - Trigger `sendPasswordResetEmail`.
- [x] **Verify Email Page (`src/app/(auth)/verify-email/page.tsx`)**:
  - Instructions to check email.
  - Option to resend verification email.
  - "I've verified" button (forces token refresh).

## 4. Components & Guards

- [x] **Create `src/components/shared/ProtectedRoute.tsx`**:
  - Implement HOC/Wrapper logic.
  - Check `user` existence -> redirect to `/login`.
  - Check `user.emailVerified` -> redirect to `/verify-email`.

## 5. Integration

- [x] **Verify `src/app/layout.tsx`**: Ensure `AuthProvider` wraps the application.
- [x] **Build Check**: Run `npm run build` to ensure no lint/type errors.

## 6. Verification

- [x] Manual verification of flows:
  - Signup -> Verify Email sent -> User created in Firestore.
  - Login -> Redirects.
  - Protected Route check.
