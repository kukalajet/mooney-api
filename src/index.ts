import { Elysia } from "elysia";
import { firebaseServiceKey } from "config";
import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";
import { AuthenticationError } from "src/lib/errors/exceptions";
import { plugin } from "src/lib/errors";

const serviceAccount = {
  projectId: firebaseServiceKey.project_id,
  clientEmail: firebaseServiceKey.client_email,
  privateKey: firebaseServiceKey.private_key,
} satisfies ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = new Elysia()
  .use(plugin)
  .guard(
    {
      beforeHandle: () => {
        throw new AuthenticationError("Before Handle Error");
      },
    },
    (app) => {
      return app.get("/", async () => {
        const idToken =
          "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEyMzhkZDA0Y2JhYTU4MGIzMDRjODgxZTFjMDA4ZWMyOGZiYmFkZGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20va3VsZXRhLWFwcCIsImF1ZCI6Imt1bGV0YS1hcHAiLCJhdXRoX3RpbWUiOjE3MTQ1MDkzODAsInVzZXJfaWQiOiJ0NUxXb3kwRFdDUWNCY05SODhoR0FKSGwwQ0UzIiwic3ViIjoidDVMV295MERXQ1FjQmNOUjg4aEdBSkhsMENFMyIsImlhdCI6MTcxNDUwOTM4MCwiZXhwIjoxNzE0NTEyOTgwLCJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInVzZXIxQHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.CjkbukUjX18DjdzJptFOvol8up4_RfCYgHoPJH8XtljH2xTlqIV2ARcMl96xJ2dEd_dcvMEDJY3Mz9qr-WVuWBxjG9cBW-YdvglxMrZXgcd4I71TCXSJiQ2OyOsoRxURXGJ_fvm4UZRXa_Rqg7Fq2tNCSohTaktWMZAO68lL4xDCDLg7-gnKQAkBKYNuqgVqXCA0XEDn1YTR3WO6WdNtjrcoYkrLGecF40JV9eLCwmHrwCgJb7FLi32LFzsNVWyfluDvgI-JoG6F5S4G7eC8VXc_VkFButhl_lMyePEScALFTbJhTGYCCGxiFZ0vV97moo43gHNT719D0IUFz4-K6g";
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log(decodedToken);

        return "Hello Elysia";
      });
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
