"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { REDIRECT_PATHS } from "@/lib/redirectHelpers";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push(REDIRECT_PATHS.LOGIN);
      return;
    }

    if (!user.emailVerified) {
      router.push(REDIRECT_PATHS.VERIFY_EMAIL);
      return;
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    // You might want to render a spinner here
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || !user.emailVerified) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}
