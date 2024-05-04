import { Elysia } from "elysia";
import { errors } from "src/libs/errors";
import { setup } from "src/setup";
import { users } from "src/controllers";
import swagger from "@elysiajs/swagger";

setup();

const app = new Elysia()
  .use(swagger({ path: "/swagger" }))
  .use(errors)
  .use(users)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
