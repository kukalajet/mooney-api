import type Elysia from "elysia";

import { AuthenticationError } from "./exceptions";

const errors = (app: Elysia) =>
  app
    .error("UNAUTHORIZED_ERROR", AuthenticationError)
    .onError(({ code, error, set }) => {
      console.log("here");
      switch (code) {
        case "UNAUTHORIZED_ERROR": {
          console.log("here");
          set.status = 401;
          const status = "error";
          const message = error.toString();

          return { status, message };
        }
      }
    });

export { errors };
