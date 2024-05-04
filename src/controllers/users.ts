import type Elysia from "elysia";
import { authenticated } from "src/libs/auth";
import { database } from "src/libs/db";
import { getAllUsers } from "src/libs/users";

const users = (app: Elysia) =>
  app
    .use(authenticated)
    .use(database)
    .get("/users", ({ db }) => getAllUsers(db))
    .post("/users", () => "Hello Users")
    .delete("/users", () => "Hello Users");

export { users };
