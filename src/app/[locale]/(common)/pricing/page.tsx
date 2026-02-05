"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";

type BillingCycle = "monthly" | "annual";

export default function PricingPage() {
  const t = useTranslations("pricing");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const plans = [
    { name: t("planFree"), features: [t("featureA"), t("featureB")], cta: t("ctaFree") },
    { name: t("planStandard"), features: [t("featureA"), t("featureB"), t("featureC")], cta: t("ctaStart"), highlight: true },
    { name: t("planPro"), features: [t("featureA"), t("featureB"), t("featureC"), t("featureD")], cta: t("ctaStart") },
  ];

  const faqs = [
    { q: t("faq1q"), a: t("faq1a") },
    { q: t("faq2q"), a: t("faq2a") },
    { q: t("faq3q"), a: t("faq3a") },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("backToTop")}
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-gray-600">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}
            >
              {t("monthly")}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={billingCycle === "annual"}
              onClick={() =>
                setBillingCycle((prev) =>
                  prev === "monthly" ? "annual" : "monthly"
                )
              }
              className={`relative h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${billingCycle === "annual" ? "bg-blue-600" : "bg-gray-200"}`}
            >
              <span
                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${billingCycle === "annual" ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
            <span
              className={`text-sm font-medium ${billingCycle === "annual" ? "text-gray-900" : "text-gray-500"}`}
            >
              {t("annual")}
            </span>
            {billingCycle === "annual" && (
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                {t("badgeSave")}
              </span>
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border bg-white p-6 shadow-sm ${
                plan.highlight
                  ? "border-blue-500 ring-2 ring-blue-500"
                  : "border-gray-200"
              }`}
            >
              <h2 className="text-lg font-semibold text-gray-900">{plan.name}</h2>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {billingCycle === "monthly" ? t("monthly") : t("annual")}
                <span className="text-sm font-normal text-gray-500">
                  {t("priceNote")}
                </span>
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="h-5 w-5 shrink-0 text-green-500" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.name === t("planFree") ? "/signup" : "/pricing"}
                className="mt-6 block w-full rounded-md bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <HelpCircle className="h-6 w-6" aria-hidden />
            {t("faqTitle")}
          </h2>
          <dl className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <dt className="font-medium text-gray-900">{faq.q}</dt>
                <dd className="mt-2 text-sm text-gray-600">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  );
}
