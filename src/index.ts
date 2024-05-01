import { Elysia } from "elysia";
import { isAuthenticated } from "src/libs/auth";
import { AuthenticationError, plugin } from "src/libs/errors";
import { setup } from "src/setup";

setup();

const app = new Elysia()
  .use(plugin)
  .guard(
    {
      beforeHandle: async () => {
        const token = "token";
        if (!(await isAuthenticated(token))) {
          throw new AuthenticationError("Invalid token");
        }
      },
    },
    (app) => app.get("/", () => "Hello Elysia")
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
