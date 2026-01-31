import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "利用規約",
  description: "当サービスの利用規約です。",
};

export default function TermsPage() {
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
            利用規約
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            最終更新日: {new Date().toLocaleDateString("ja-JP")}
          </p>

          <div className="mt-8 space-y-8 text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                第1条（適用）
              </h2>
              <p className="mt-2 leading-relaxed">
                本規約は、本サービス（以下「当サービス」）の利用条件を定めるものです。ユーザーの皆様には、本規約に同意のうえ、当サービスをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                第2条（利用登録）
              </h2>
              <p className="mt-2 leading-relaxed">
                当サービスでは、登録希望者が本規約に同意のうえ、所定の方法により利用登録を申請し、当サービスがこれを承認することによって、利用登録が完了するものとします。当サービスは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 pl-2">
                <li>虚偽の事項を届け出た場合</li>
                <li>本規約に違反したことがある者からの申請である場合</li>
                <li>その他、当サービスが利用登録を相当でないと認めた場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                第3条（禁止事項）
              </h2>
              <p className="mt-2 leading-relaxed">
                ユーザーは、当サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 pl-2">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当サービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーまたは第三者の権利を侵害する行為</li>
                <li>不正アクセスを試みる行為、またはその準備行為</li>
                <li>その他、当サービスが不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                第4条（サービスの提供の停止等）
              </h2>
              <p className="mt-2 leading-relaxed">
                当サービスは、以下の場合には、ユーザーに事前に通知することなく、当サービスの全部または一部の提供を停止または中断することができるものとします。システムの保守・点検を行う場合、地震・停電・天災等の不可抗力により提供が困難な場合、その他当サービスが停止または中断が必要と判断した場合がこれに該当します。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                第5条（免責事項）
              </h2>
              <p className="mt-2 leading-relaxed">
                当サービスは、当サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性を含みますがこれらに限りません）がないことを保証するものではありません。当サービスに起因してユーザーに生じた損害について、当サービスは一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                第6条（規約の変更）
              </h2>
              <p className="mt-2 leading-relaxed">
                当サービスは、必要と認めた場合には、ユーザーに通知することなく本規約を変更することができるものとします。変更後の本規約は、当サービスに掲載したときから効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                第7条（お問い合わせ）
              </h2>
              <p className="mt-2 leading-relaxed">
                本規約に関するお問い合わせは、当サービス内のお問い合わせ窓口までご連絡ください。
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
