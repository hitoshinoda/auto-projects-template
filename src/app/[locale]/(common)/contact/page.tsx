"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth-context";
import { REDIRECT_PATHS } from "@/lib/redirectHelpers";

export default function ContactPage() {
  const t = useTranslations("contact");
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<
    "general" | "feature_request" | "bug_report"
  >("general");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      if ((category === "feature_request" || category === "bug_report") && !user) {
        setStatus("error");
        setErrorMessage(t("errorLoginRequired"));
        router.push(REDIRECT_PATHS.LOGIN);
        return;
      }

      const token = user ? await user.getIdToken() : null;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name, email, subject, body, category }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? t("errorSendFailed"));
      }
      setStatus("success");
      setName("");
      setEmail("");
      setCategory("general");
      setSubject("");
      setBody("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : t("errorSendFailed"));
    }
  };

  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@example.com";

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("backToTop")}
        </Link>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mt-2 text-gray-600">
            {t("intro")}{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-500"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {supportEmail}
            </a>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t("nameLabel")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("emailLabel")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                {t("categoryLabel")}
              </label>
              <select
                id="category"
                name="category"
                required
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value as "general" | "feature_request" | "bug_report"
                  )
                }
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="general">{t("categoryGeneral")}</option>
                <option value="feature_request">{t("categoryFeatureRequest")}</option>
                <option value="bug_report">{t("categoryBugReport")}</option>
              </select>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                {t("subjectLabel")}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                {t("bodyLabel")}
              </label>
              <textarea
                id="body"
                name="body"
                rows={5}
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {status === "success" && (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
                {t("successMessage")}
              </div>
            )}
            {status === "error" && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {status === "sending" ? (
                t("sending")
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden />
                  {t("submitButton")}
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
