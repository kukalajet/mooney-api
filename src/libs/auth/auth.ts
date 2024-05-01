import admin from "firebase-admin";

async function isAuthenticated(token: string) {
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return Boolean(decoded);
  } catch (error) {
    return false;
  }
}

export { isAuthenticated };
