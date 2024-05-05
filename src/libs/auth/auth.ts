import Elysia from "elysia";
import admin from "firebase-admin";
import { AuthenticationError } from "src/libs/errors";

async function isAuthenticated(token: string) {
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return Boolean(decoded);
  } catch (error) {
    return false;
  }
}

const authenticated = new Elysia().onBeforeHandle(
  { as: "global" },
  async ({ headers }) => {
    const token = headers.authorization?.split("Bearer ")[1];
    if (!token) {
      throw new AuthenticationError("Invalid token.");
    }

    const authenticated = await isAuthenticated(token);
    if (!authenticated) {
      throw new AuthenticationError("Invalid token.");
    }
  }
);

const user = (app: Elysia) =>
  app.derive(async ({ headers }) => {
    const token = headers.authorization?.split("Bearer ")[1];
    if (!token) {
      throw new AuthenticationError("Invalid token.");
    }

    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded) {
      throw new AuthenticationError("Invalid token.");
    }

    return { user: decoded };
  });

export { authenticated, user };
