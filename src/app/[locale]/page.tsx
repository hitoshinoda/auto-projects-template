import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoRequirements } from "@/lib/geo/requirements";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const requirements = getSeoRequirements();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col gap-16 py-24 px-6 bg-white dark:bg-black sm:px-12">
        <header className="flex flex-col gap-8" aria-label={t("heroLabel")}>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="flex flex-col gap-4 text-left">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
              {t("title")}
            </h1>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {t("getStarted")}{" "}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Templates
              </a>{" "}
              or{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Learning
              </a>
              .
            </p>
          </div>
        </header>

        <section className="flex flex-col gap-6" aria-label={t("benefitsLabel")}>
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            {t("benefitsTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {requirements.benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
              >
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  {benefit}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {t("benefitsDetail")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6" aria-label={t("painPointsLabel")}>
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            {t("painPointsTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {requirements.painPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
              >
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  {point}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {t("painPointsDetail")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6" aria-label={t("solutionsLabel")}>
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            {t("solutionsTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {requirements.solutions.map((solution) => (
              <div
                key={solution}
                className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
              >
                <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                  {solution}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {t("solutionsDetail")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6" aria-label={t("ctaLabel")}>
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {t("ctaDescription")}
          </p>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={16}
                height={16}
              />
              {t("deploy")}
            </a>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("docs")}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
