"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, CreditCard, Package } from "lucide-react";

export default function BillingPage() {
  const t = useTranslations("user.billing");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("backToDashboard")}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900">{t("title")}</h1>

        <div className="mt-8 space-y-6">
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Package className="h-5 w-5" aria-hidden />
              {t("currentPlan")}
            </h2>
            <p className="mt-4 text-gray-600">
              {t("planNamePlaceholder")}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {t("nextRenewalPlaceholder")}
            </p>
            <Link
              href="/pricing"
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              {t("changePlan")}
            </Link>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <CreditCard className="h-5 w-5" aria-hidden />
              {t("paymentMethod")}
            </h2>
            <p className="mt-4 text-sm text-gray-600">
              {t("paymentMethodPlaceholder")}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {t("paymentMethodNote")}
            </p>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">{t("invoiceHistory")}</h2>
            <p className="mt-4 text-sm text-gray-500">
              {t("invoiceHistoryNote")}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
