import { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";
import { isAuthenticatedPlugin } from "src/libs/auth";
import { errors } from "src/libs/errors";
import { setup } from "src/setup";
import { users } from "src/controllers";
import swagger from "@elysiajs/swagger";

const db = new PrismaClient();

setup();

const app = new Elysia()
  .use(swagger({ path: "/swagger" }))
  .use(errors)
  .decorate("db", db)
  .guard((app) => app.use(isAuthenticatedPlugin).use(users))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
