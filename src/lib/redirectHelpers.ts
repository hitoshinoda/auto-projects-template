export const REDIRECT_PATHS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/",
  DASHBOARD: "/dashboard",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  AFTER_LOGIN: "/dashboard",
  AFTER_SIGNUP: "/dashboard",
};

/**
 * Helper to determine redirect path based on user state
 */
export const getRedirectPath = (
  isLoggedIn: boolean,
  isEmailVerified: boolean,
): string | null => {
  if (!isLoggedIn) {
    // If not logged in and trying to access protected route (assumed default), go to login
    // This logic is usually handled in the component/middleware, but we provide helpers here.
    return REDIRECT_PATHS.LOGIN;
  }

  if (isLoggedIn && !isEmailVerified) {
    return REDIRECT_PATHS.VERIFY_EMAIL;
  }

  return null;
};
