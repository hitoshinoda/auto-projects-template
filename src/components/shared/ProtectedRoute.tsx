"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import { useRouter } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { REDIRECT_PATHS } from "@/lib/redirectHelpers";
import { Skeleton, SkeletonText } from "./Skeleton";

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
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-4">
          <Skeleton height={32} width={200} />
          <SkeletonText lines={4} />
          <Skeleton height={40} width="60%" />
        </div>
      </div>
    );
  }

  if (!user || !user.emailVerified) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}
