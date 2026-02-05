"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LogOut, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  const t = useTranslations("user.dashboard");
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 text-gray-900">
            <LayoutDashboard className="h-6 w-6" aria-hidden />
            <span className="font-semibold">{t("title")}</span>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            {t("logout")}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">
            {t("welcome")}
          </h1>
          <p className="mt-1 text-gray-600">
            {t("loggedInAs")}{" "}
            <span className="font-medium text-gray-900">
              {user?.email ?? "—"}
            </span>
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/settings"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {t("settingsLink")}
            </Link>
            <Link
              href="/billing"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {t("billingLink")}
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {t("backToTop")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
