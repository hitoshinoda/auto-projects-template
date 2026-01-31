import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "当サービスにおけるプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          トップへ戻る
        </Link>

        <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            プライバシーポリシー
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            最終更新日: {new Date().toLocaleDateString("ja-JP")}
          </p>

          <div className="mt-8 space-y-8 text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                1. はじめに
              </h2>
              <p className="mt-2 leading-relaxed">
                本サービス（以下「当サービス」）は、ユーザーの個人情報の保護を重要な責務と認識し、以下の方針に基づいて個人情報を適切に取り扱います。本ポリシーは、当サービスが収集する情報、その利用目的、および保護措置について説明するものです。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                2. 収集する情報
              </h2>
              <p className="mt-2 leading-relaxed">
                当サービスでは、以下の情報を収集する場合があります。
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 pl-2">
                <li>アカウント登録時にご提供いただく情報（メールアドレス、表示名など）</li>
                <li>サービス利用時に自動的に取得される情報（IPアドレス、ブラウザ種類、アクセス日時など）</li>
                <li>お問い合わせやサポート依頼の際にご提供いただく情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                3. 情報の利用目的
              </h2>
              <p className="mt-2 leading-relaxed">
                収集した情報は、以下の目的で利用します。
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 pl-2">
                <li>当サービスの提供、維持、改善</li>
                <li>認証およびアカウント管理</li>
                <li>お問い合わせへの対応</li>
                <li>利用規約に違反する行為への対応</li>
                <li>法令に基づく対応</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                4. 第三者への提供
              </h2>
              <p className="mt-2 leading-relaxed">
                当サービスは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供しません。ただし、サービス提供に必要な範囲で、信頼できる業務委託先に預託する場合があります。その際は、適切な契約により情報の保護を図ります。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                5.  Cookie・類似技術
              </h2>
              <p className="mt-2 leading-relaxed">
                当サービスでは、利便性の向上や利用状況の把握のためにCookieおよび類似の技術を使用することがあります。ブラウザの設定によりCookieを無効にすることができますが、一部の機能が利用できなくなる場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                6. お問い合わせ
              </h2>
              <p className="mt-2 leading-relaxed">
                本ポリシーに関するお問い合わせは、当サービス内のお問い合わせ窓口までご連絡ください。
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
