"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import UpgradeButton from "./UpgradeButton";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isPro, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!isPro) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 border rounded-lg bg-zinc-50 dark:bg-zinc-900">
        <h2 className="text-xl font-bold">Premium Content</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          You need a Pro subscription to access this content.
        </p>

        {fallback ? fallback : <UpgradeButton />}
      </div>
    );
  }

  return <>{children}</>;
}
