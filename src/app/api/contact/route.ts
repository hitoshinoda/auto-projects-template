import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { headers } from "next/headers";
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  subject: z.string().min(1, "件名を入力してください"),
  body: z.string().min(1, "お問い合わせ内容を入力してください"),
  category: z.enum(["general", "feature_request", "bug_report"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "入力内容を確認してください";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { name, email, subject, body: text, category } = parsed.data;

    const requiresAuth = category === "feature_request" || category === "bug_report";
    let userId: string | null = null;
    if (requiresAuth) {
      const authHeader = (await headers()).get("Authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json(
          { error: "機能要望または不具合報告の送信にはログインが必要です。" },
          { status: 401 }
        );
      }
      const token = authHeader.split("Bearer ")[1];
      if (!token) {
        return NextResponse.json(
          { error: "機能要望または不具合報告の送信にはログインが必要です。" },
          { status: 401 }
        );
      }

      const decodedToken = await adminAuth.verifyIdToken(token);
      userId = decodedToken.uid ?? null;
      if (!userId) {
        return NextResponse.json(
          { error: "機能要望または不具合報告の送信にはログインが必要です。" },
          { status: 401 }
        );
      }
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ?? "587";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactTo = process.env.CONTACT_TO_EMAIL ?? process.env.MAIL_TO;

    if (!smtpHost || !smtpUser || !smtpPass || !contactTo) {
      return NextResponse.json(
        { error: "メール送信の設定がありません。管理者にご連絡ください。" },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const subjectPrefixMap: Record<typeof category, string> = {
      general: "お問い合わせ",
      feature_request: "Feature Request",
      bug_report: "Bug Report",
    };
    const subjectPrefix = subjectPrefixMap[category] ?? "お問い合わせ";
    const mailSubject = `[${subjectPrefix}] ${subject}`;

    await transporter.sendMail({
      from: `"お問い合わせ" <${smtpUser}>`,
      to: contactTo,
      replyTo: email,
      subject: mailSubject,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\n${text}`,
      html: `
        <p><strong>お名前:</strong> ${escapeHtml(name)}</p>
        <p><strong>メールアドレス:</strong> ${escapeHtml(email)}</p>
        <p><strong>お問い合わせ種別:</strong> ${escapeHtml(category)}</p>
        <hr />
        <p>${escapeHtml(text).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (category === "feature_request") {
      const projectId =
        process.env.NEXT_PUBLIC_PROJECT_ID ??
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ??
        "default-project";

      await adminDb
        .collection("projects")
        .doc(projectId)
        .collection("requests")
        .add({
          userId: userId ?? null,
          email,
          category: "feature_request",
          title: subject,
          description: text,
          status: "pending",
          createdAt: FieldValue.serverTimestamp(),
        });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "送信に失敗しました。しばらくしてから再度お試しください。" },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
