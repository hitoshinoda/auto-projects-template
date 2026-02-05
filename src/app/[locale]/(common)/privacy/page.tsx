import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacy");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  const section3Items = [
    t("section3Item1"),
    t("section3Item2"),
    t("section3Item3"),
    t("section3Item4"),
    t("section3Item5"),
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
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {t("lastUpdated")} {new Date().toLocaleDateString("ja-JP")}
          </p>

          <div className="mt-8 space-y-8 text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                {t("section1Title")}
              </h2>
              <p className="mt-2 leading-relaxed">{t("section1Body")}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                {t("section2Title")}
              </h2>
              <p className="mt-2 leading-relaxed">{t("section2Body")}</p>
              <ul className="mt-3 list-inside list-disc space-y-1 pl-2">
                <li>{t("section2Item1")}</li>
                <li>{t("section2Item2")}</li>
                <li>{t("section2Item3")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                {t("section3Title")}
              </h2>
              <p className="mt-2 leading-relaxed">{t("section3Body")}</p>
              <ul className="mt-3 list-inside list-disc space-y-1 pl-2">
                {section3Items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                {t("section4Title")}
              </h2>
              <p className="mt-2 leading-relaxed">{t("section4Body")}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                {t("section5Title")}
              </h2>
              <p className="mt-2 leading-relaxed">{t("section5Body")}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900">
                {t("section6Title")}
              </h2>
              <p className="mt-2 leading-relaxed">{t("section6Body")}</p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
