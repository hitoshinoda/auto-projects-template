import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { firebaseConfig } from "./config";

const app: FirebaseApp =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : (getApps()[0] as FirebaseApp);

export const auth: Auth = getAuth(app);
export const db: Firestore = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID
  ? getFirestore(app, process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID)
  : getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

export default app;
