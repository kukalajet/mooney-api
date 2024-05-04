import Elysia from "elysia";
import { injectDatabase } from "src/libs/db";
import { getAllUsers } from "src/libs/users";

const users = (app: Elysia) =>
  app
    .use(injectDatabase)
    .get("/users", async ({ db }) => getAllUsers(db))
    .post("/users", () => "Hello Users")
    .delete("/users", () => "Hello Users");

export { users };
