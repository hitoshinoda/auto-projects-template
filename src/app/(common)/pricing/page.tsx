"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, HelpCircle } from "lucide-react";

type BillingCycle = "monthly" | "annual";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          トップへ戻る
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            料金プラン
          </h1>
          <p className="mt-2 text-gray-600">
            ご利用目的に合わせてプランをお選びください。
          </p>

          {/* 年額/月額切替 */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}
            >
              月額
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
              年額
            </span>
            {billingCycle === "annual" && (
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                お得
              </span>
            )}
          </div>
        </div>

        {/* プラン比較 */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "フリー", features: ["機能A", "機能B"], cta: "無料で始める" },
            {
              name: "スタンダード",
              features: ["機能A", "機能B", "機能C"],
              cta: "始める",
              highlight: true,
            },
            {
              name: "プロ",
              features: ["機能A", "機能B", "機能C", "機能D"],
              cta: "始める",
            },
          ].map((plan) => (
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
                {billingCycle === "monthly" ? "月額" : "年額"}
                <span className="text-sm font-normal text-gray-500">
                  （税込表示はこちらで記載）
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
                href={plan.name === "フリー" ? "/signup" : "/pricing"}
                className="mt-6 block w-full rounded-md bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <HelpCircle className="h-6 w-6" aria-hidden />
            よくある質問
          </h2>
          <dl className="mt-6 space-y-4">
            {[
              { q: "プランの変更はいつでもできますか？", a: "（記載してください）" },
              { q: "解約後の返金はありますか？", a: "（記載してください）" },
              { q: "請求書は発行できますか？", a: "（記載してください）" },
            ].map((faq) => (
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
