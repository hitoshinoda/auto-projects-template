"use client";

import { useAuth } from "@/lib/firebase/auth-context";
import Link from "next/link";
import { ArrowLeft, User, Mail, Shield } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();

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
        <h1 className="text-xl font-semibold text-gray-900">設定</h1>

        <div className="mt-8 space-y-6">
          {/* プロフィール */}
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <User className="h-5 w-5" aria-hidden />
              プロフィール
            </h2>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">表示名</dt>
                <dd className="mt-1 text-gray-900">
                  {user?.displayName ?? "（未設定）"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">メールアドレス</dt>
                <dd className="mt-1 flex items-center gap-2 text-gray-900">
                  <Mail className="h-4 w-4 text-gray-400" aria-hidden />
                  {user?.email ?? "—"}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-gray-500">
              プロフィールの変更は、認証プロバイダ（Google 等）の設定から行ってください。
            </p>
          </section>

          {/* アカウント・セキュリティ */}
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Shield className="h-5 w-5" aria-hidden />
              アカウント・セキュリティ
            </h2>
            <p className="mt-4 text-sm text-gray-600">
              パスワードの変更や二段階認証は、認証プロバイダの設定から行ってください。
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
