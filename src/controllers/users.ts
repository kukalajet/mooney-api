import Elysia from "elysia";

const users = (app: Elysia) =>
  app
    .get("/users", () => "Hello Users")
    .post("/users", () => "Hello Users")
    .delete("/users", () => "Hello Users");

export { users };
