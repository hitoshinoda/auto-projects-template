"use client";

import Link from "next/link";
import { ArrowLeft, CreditCard, Package } from "lucide-react";

export default function BillingPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            ダッシュボードへ
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900">課金管理</h1>

        <div className="mt-8 space-y-6">
          {/* 現在のプラン */}
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Package className="h-5 w-5" aria-hidden />
              現在のプラン
            </h2>
            <p className="mt-4 text-gray-600">
              プラン名: （ここにプラン名を表示）
            </p>
            <p className="mt-1 text-sm text-gray-500">
              次回更新日: （ここに日付を表示）
            </p>
            <Link
              href="/pricing"
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              プランを変更する →
            </Link>
          </section>

          {/* 支払い方法 */}
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <CreditCard className="h-5 w-5" aria-hidden />
              支払い方法
            </h2>
            <p className="mt-4 text-sm text-gray-600">
              登録中の支払い方法: （ここにカード情報等を表示）
            </p>
            <p className="mt-2 text-sm text-gray-500">
              支払い方法の追加・変更は Stripe カスタマーポータル等と連携して実装してください。
            </p>
          </section>

          {/* 請求履歴 */}
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">請求履歴</h2>
            <p className="mt-4 text-sm text-gray-500">
              請求履歴の一覧は Stripe と連携して表示してください。
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
