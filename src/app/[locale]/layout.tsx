import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSeoRequirements, getSiteBaseUrl } from "@/lib/geo/requirements";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const requirements = getSeoRequirements();
  const baseUrl = getSiteBaseUrl();
  const enhancedDescription = [
    t("description"),
    requirements.description,
    requirements.benefits.join(" / "),
    requirements.keywords.join(", "),
  ]
    .filter(Boolean)
    .join(" ");

  const languages = Object.fromEntries(
    routing.locales.map((entry) => [entry, `/${entry}`])
  );
  return {
    title: t("title"),
    description: enhancedDescription,
    keywords: requirements.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: enhancedDescription,
      siteName: requirements.name,
      url: `/${locale}`,
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const requirements = getSeoRequirements();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: requirements.name,
    description: requirements.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
  };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </NextIntlClientProvider>
  );
}
