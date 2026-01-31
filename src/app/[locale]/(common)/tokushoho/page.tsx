import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "特商法表記",
  description: "特定商取引法に基づく表記です。",
};

export default function TokushohoPage() {
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
            特定商取引法に基づく表記
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            最終更新日: {new Date().toLocaleDateString("ja-JP")}
          </p>

          <div className="mt-8 space-y-6 text-gray-700">
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">事業者名</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">代表者名</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">所在地</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">電話番号</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">メールアドレス</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">販売URL</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">販売価格</h2>
              <p className="text-sm">（各商品・サービスに表示）</p>
            </section>
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">支払方法</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">支払時期</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">サービス提供時期</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
            <section className="grid gap-2 border-b border-gray-200 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">返品・キャンセル</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
            <section className="grid gap-2 pb-4">
              <h2 className="text-sm font-semibold text-gray-900">相談窓口</h2>
              <p className="text-sm">（記載してください）</p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
