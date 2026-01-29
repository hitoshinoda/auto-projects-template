import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

/**
 * FIREBASE_SERVICE_ACCOUNT environment variable should be a JSON string of the service account key.
 * If not provided, it will attempt to use applicationDefault credentials.
 */
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
const serviceAccount = serviceAccountString ? JSON.parse(serviceAccountString) : undefined;

if (getApps().length === 0) {
  admin.initializeApp({
    credential: serviceAccount ? admin.credential.cert(serviceAccount) : admin.credential.applicationDefault(),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();
export { admin };
