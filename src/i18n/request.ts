import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const namespaces = [
    "common",
    "home",
    "Metadata",
    "contact",
    "auth",
    "pricing",
    "terms",
    "privacy",
    "tokushoho",
    "user",
  ] as const;

  const entries = await Promise.all(
    namespaces.map(async (namespace) => [
      namespace,
      (await import(`../../messages/${locale}/${namespace}.json`)).default,
    ])
  );

  const messages = Object.fromEntries(entries);

  return {
    locale,
    messages,
  };
});
