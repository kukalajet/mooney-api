import type { Prisma, PrismaClient } from "@prisma/client";

const getAllUsers = async (
  db: PrismaClient<Prisma.PrismaClientOptions, never, any>
) => {
  const users = await db.user.findMany();
  return users;
};

const getUserById = async (
  id: string,
  db: PrismaClient<Prisma.PrismaClientOptions, never, any>
) => {
  const first = await db.user.findFirst({ where: { id } });
  if (!first) {
    throw new Error("not found");
  }

  return first;
};

const createUser = async () => {};

const updateUser = async () => {};

const deleteUser = async () => {};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
