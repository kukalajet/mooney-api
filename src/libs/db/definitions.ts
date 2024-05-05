import type { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

// NOTE: Not sure this is the best way to do this, but it works for now.
type PrismaDefaultArgsClient = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  DefaultArgs
>;

export type { PrismaDefaultArgsClient };
