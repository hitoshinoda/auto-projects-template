/**
 * 環境変数の型定義（アナリティクス・Firebase 用）
 */
declare namespace NodeJS {
  interface ProcessEnv {
    /** アナリティクス用プロジェクトID（Firestore パス用）。未設定時は default-project */
    NEXT_PUBLIC_PROJECT_ID?: string;
    /** Firebase サービスアカウント JSON 文字列 */
    FIREBASE_SERVICE_ACCOUNT?: string;
    NEXT_PUBLIC_FIREBASE_API_KEY?: string;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID?: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?: string;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string;
    NEXT_PUBLIC_FIREBASE_APP_ID?: string;
  }
}
