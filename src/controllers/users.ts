import type Elysia from "elysia";
import { authenticated, user } from "src/libs/auth";
import { database } from "src/libs/db";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "src/libs/users";
import { models } from "src/models/users";

const users = (app: Elysia) =>
  app
    .use(authenticated)
    .use(database)
    .use(models)
    .use(user)
    .group("/users", (app) =>
      app
        .get("/", ({ db }) => getAllUsers(db))
        .post("/", ({ body, user, db }) => createUser(user.uid, body, db), {
          body: "user-sign-up-body",
        })
        .delete("/", ({ user, db }) => deleteUser(user.uid, db))
        .get("/:id", ({ params: { id }, db }) => getUserById(id, db), {
          params: "user-get-by-id-params",
        })
    );

export { users };
