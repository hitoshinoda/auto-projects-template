# Firebase Authentication System Implementation Task

## Goal

auto-projects-template に、Firebase Authentication を利用した完全な認証システムを実装する。
これには、新規登録、ログイン、パスワードリセット、メール認証、および適切なリダイレクトと状態管理が含まれる。

## Requirements

### 1. Authentication Flow Pages

- **Signup (`/signup`)**:
  - Email/Password registration.
  - Google Sign-in.
  - Send email verification (`sendEmailVerification`) after registration.
- **Login (`/login`)**:
  - Email/Password login.
  - Google Sign-in.
  - Redirect logic for unauthenticated access.
- **Forgot Password (`/forgot-password`)**:
  - Password reset using `sendPasswordResetEmail`.
- **Verify Email (`/verify-email`)**:
  - Landing page for unverified users.

### 2. State Management (`AuthContext`)

- Identify user state and `AppUser` data from Firestore.
- **Multi-tenancy**: Use `process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID` for Firestore connection.
- **Initial User Creation**: Create default user document in `users/{uid}` on first login.

### 3. Redirects & Guards

- **`src/proxy.ts`**: Create for redirect logic.
- **`ProtectedRoute.tsx`**:
  - Redirect unauthenticated users to `/login`.
  - Redirect unverified email users to `/verify-email`.
  - Render children if authenticated and verified.

### 4. Layout & Configuration

- Wrap `src/app/layout.tsx` with `AuthProvider`. (Already done, verify configuration).
- Use strict types (`AppUser` from `src/types/db.ts`).
- Escape JSX properly.
