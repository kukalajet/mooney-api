import type { PrismaDefaultArgsClient } from "src/libs/db";
import type { CreateWalletDto, UpdateWalletDto } from "./definitions";

const getAllUserWallets = async (
  userId: string,
  db: PrismaDefaultArgsClient
) => {
  const wallets = await db.wallet.findMany({ where: { userId } });
  return wallets;
};

const getUserWalletById = async (
  userId: string,
  walletId: string,
  db: PrismaDefaultArgsClient
) => {
  const id = walletId;

  const first = await db.wallet.findFirst({ where: { id, userId } });
  if (!first) {
    throw new Error("[HANDLE ERROR]: not found");
  }

  return first;
};

const createUserWallet = async (
  userId: string,
  data: CreateWalletDto,
  db: PrismaDefaultArgsClient
) => {
  try {
    const wallet = await db.wallet.create({ data: { ...data, userId } });

    return wallet;
  } catch (error) {
    throw new Error("[HANDLE ERROR]: cannot create wallet");
  }
};

const updateUserWallet = async (
  userId: string,
  walletId: string,
  data: UpdateWalletDto,
  db: PrismaDefaultArgsClient
) => {
  const id = walletId;
  const where = { id, userId };

  try {
    const wallet = await db.wallet.update({ where, data });

    return wallet;
  } catch (error) {
    throw new Error("[HANDLE ERROR]: cannot update wallet");
  }
};

const deleteUserWallet = async (
  userId: string,
  walletId: string,
  db: PrismaDefaultArgsClient
) => {
  const id = walletId;
  const where = { id, userId };

  try {
    return await db.wallet.delete({ where });
  } catch (error) {
    throw new Error("[HANDLE ERROR]: cannot delete wallet");
  }
};

export {
  getAllUserWallets,
  getUserWalletById,
  createUserWallet,
  updateUserWallet,
  deleteUserWallet,
};
