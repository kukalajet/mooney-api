import { t } from "elysia";
import type Elysia from "elysia";
import { authenticated } from "src/libs/auth";
import { database } from "src/libs/db";
import { getAllUsers, getUserById } from "src/libs/users";

const users = (app: Elysia) =>
  app
    .use(authenticated)
    .use(database)
    .group("/users", (app) =>
      app
        .get("/:id", ({ params: { id }, db }) => getUserById(id, db), {
          params: t.Object({ id: t.String() }),
        })
        .get("/users", ({ db }) => getAllUsers(db))
        .post("/users", () => "Hello Users")
        .delete("/users", () => "Hello Users")
    );

export { users };
