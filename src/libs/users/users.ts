import type { PrismaDefaultArgsClient } from "src/libs/db";
import type { CreateUserDto, UpdateUserDto } from "./definitions";

const getAllUsers = async (db: PrismaDefaultArgsClient) => {
  const users = await db.user.findMany();
  return users;
};

const getUserById = async (id: string, db: PrismaDefaultArgsClient) => {
  const first = await db.user.findFirst({ where: { id } });
  if (!first) {
    throw new Error("[HANDLE ERROR]: not found");
  }

  return first;
};

const createUser = async (
  id: string,
  data: CreateUserDto,
  db: PrismaDefaultArgsClient
) => {
  try {
    const user = await db.user.create({ data: { ...data, id } });

    return user;
  } catch (error) {
    throw new Error("[HANDLE ERROR]: cannot create user");
  }
};

const updateUser = async (data: UpdateUserDto, db: PrismaDefaultArgsClient) => {
  const { id, name, email } = data;

  try {
    const user = await db.user.update({
      where: { id },
      data: { name, email },
    });

    return user;
  } catch (error) {
    throw new Error("[HANDLE ERROR]: cannot update user");
  }
};

const deleteUser = async (id: string, db: PrismaDefaultArgsClient) => {
  try {
    return await db.user.delete({ where: { id } });
  } catch (error) {
    throw new Error("[HANDLE ERROR]: cannot delete user");
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
