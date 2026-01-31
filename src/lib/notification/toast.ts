/**
 * テンプレート用 Toast ユーティリティ
 * Sonner をラップし、アプリ全体で import { toast } from "@/lib/toast" で利用可能
 */
import { toast as sonnerToast, type ExternalToast } from "sonner";

export const toast = {
  /** 通常メッセージ */
  message: (message: string, options?: ExternalToast) =>
    sonnerToast(message, options),

  /** 成功 */
  success: (message: string, options?: ExternalToast) =>
    sonnerToast.success(message, options),

  /** エラー */
  error: (message: string, options?: ExternalToast) =>
    sonnerToast.error(message, options),

  /** 警告 */
  warning: (message: string, options?: ExternalToast) =>
    sonnerToast.warning(message, options),

  /** 情報 */
  info: (message: string, options?: ExternalToast) =>
    sonnerToast.info(message, options),

  /** ローディング（Promise 完了で自動で success/error） */
  promise: <T,>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string },
  ) => sonnerToast.promise(promise, messages),

  /** トーストを閉じる */
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
};

export type { ExternalToast };
