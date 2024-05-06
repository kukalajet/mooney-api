import type { PrismaDefaultArgsClient } from "src/libs/db";
import type { CreateTransactionDto, UpdateTransactionDto } from "./definitions";

const getAllWalletTransactions = async (
  userId: string,
  walletId: string,
  db: PrismaDefaultArgsClient
) => {
  const transactions = await db.transaction.findMany({
    where: { walletId, wallet: { userId } },
  });
  return transactions;
};

const getWalletTransactionById = async (
  userId: string,
  walletId: string,
  transactionId: string,
  db: PrismaDefaultArgsClient
) => {
  const id = transactionId;
  const where = { id, walletId, wallet: { userId } };

  const first = await db.transaction.findFirst({ where });
  if (!first) {
    throw new Error("[HANDLE ERROR]: not found");
  }

  return first;
};

const createWalletTransaction = async (
  walletId: string,
  data: CreateTransactionDto,
  db: PrismaDefaultArgsClient
) => {
  try {
    const transaction = await db.transaction.create({
      data: { ...data, walletId },
    });

    return transaction;
  } catch (error) {
    throw new Error("[HANDLE ERROR]: cannot create transaction");
  }
};

const updateWalletTransaction = async (
  userId: string,
  walletId: string,
  transactionId: string,
  data: UpdateTransactionDto,
  db: PrismaDefaultArgsClient
) => {
  const id = transactionId;
  const where = { id, walletId, wallet: { userId } };

  try {
    const transaction = await db.transaction.update({ where, data });

    return transaction;
  } catch (error) {
    throw new Error("[HANDLE ERROR]: cannot update transaction");
  }
};

const deleteWalletTransaction = async (
  userId: string,
  walletId: string,
  transactionId: string,
  db: PrismaDefaultArgsClient
) => {
  const id = transactionId;
  const where = { id, walletId, wallet: { userId } };

  try {
    const transaction = await db.transaction.delete({ where });

    return transaction;
  } catch (error) {
    throw new Error("[HANDLE ERROR]: cannot delete transaction");
  }
};

export {
  getAllWalletTransactions,
  getWalletTransactionById,
  createWalletTransaction,
  updateWalletTransaction,
  deleteWalletTransaction,
};
