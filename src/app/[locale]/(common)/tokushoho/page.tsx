import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("tokushoho");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TokushohoPage() {
  const t = await getTranslations("tokushoho");

  const sections: { key: string; value?: string }[] = [
    { key: "sellerName" },
    { key: "representative" },
    { key: "address" },
    { key: "phone" },
    { key: "email" },
    { key: "url" },
    { key: "price", value: t("priceNote") },
    { key: "paymentMethod" },
    { key: "paymentDeadline" },
    { key: "deliveryTime" },
    { key: "refundCancel" },
    { key: "contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("backToTop")}
        </Link>

        <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {t("lastUpdated")} {new Date().toLocaleDateString("ja-JP")}
          </p>

          <div className="mt-8 space-y-6 text-gray-700">
            {sections.map((section) => (
              <section
                key={section.key}
                className={`grid gap-2 ${section.key !== "contact" ? "border-b border-gray-200 pb-4" : "pb-4"}`}
              >
                <h2 className="text-sm font-semibold text-gray-900">
                  {t(section.key)}
                </h2>
                <p className="text-sm">
                  {section.value ?? t("placeholder")}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
