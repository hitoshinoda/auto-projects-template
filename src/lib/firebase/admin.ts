import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/**
 * FIREBASE_SERVICE_ACCOUNT environment variable should be a JSON string of the service account key.
 * If not provided, it will attempt to use applicationDefault credentials.
 * 既に初期化済みの場合は getApps() で検知し、二重初期化しません。
 */
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
const serviceAccount = serviceAccountString
  ? (JSON.parse(serviceAccountString) as admin.ServiceAccount)
  : undefined;

/** 環境変数またはサービスアカウントから Project ID を取得（未設定時は default-project） */
const projectId =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ??
  serviceAccount?.projectId ??
  "default-project";

if (getApps().length === 0) {
  admin.initializeApp({
    projectId,
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

/**
 * デフォルト Firestore — analytics データの書き込み先。
 * パス: projects/{projectName}/analytics/{date}
 */
export const adminDb = getFirestore();

/**
 * プロジェクト名の Firestore（名前付きデータベース）。
 * users, requests 等のプロジェクト固有データはここに保存。
 * NEXT_PUBLIC_FIREBASE_DATABASE_ID が未設定の場合はデフォルト DB にフォールバック。
 */
const databaseId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID;
export const adminProjectDb = databaseId
  ? getFirestore(databaseId)
  : getFirestore();

export const adminAuth = admin.auth();
export const adminStorage = admin.storage();
export { admin };
