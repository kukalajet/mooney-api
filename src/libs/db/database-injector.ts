import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

const db = new PrismaClient();

const database = new Elysia({ name: "database-injector" }).decorate("db", db);

export { database };
