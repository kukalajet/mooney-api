import type Elysia from "elysia";

import { AuthenticationError } from "./exceptions";

const errors = (app: Elysia) =>
  app
    .error("UNAUTHORIZED_ERROR", AuthenticationError)
    .onError(({ code, error, set }) => {
      switch (code) {
        case "UNAUTHORIZED_ERROR": {
          set.status = 401;
          const status = "error";
          const message = error.toString();

          return { status, message };
        }
      }
    });

export { errors };
