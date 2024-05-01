import { firebaseServiceKey } from "config";
import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

const serviceAccount = {
  projectId: firebaseServiceKey.project_id,
  clientEmail: firebaseServiceKey.client_email,
  privateKey: firebaseServiceKey.private_key,
} satisfies ServiceAccount;

function initializeFirebaseApp() {
  const credential = admin.credential.cert(serviceAccount);
  admin.initializeApp({ credential });
}

export { initializeFirebaseApp };
