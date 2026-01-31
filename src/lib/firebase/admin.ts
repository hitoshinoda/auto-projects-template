import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

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

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();
export { admin };
