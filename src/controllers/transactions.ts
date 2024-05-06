import type Elysia from "elysia";
import { authenticated, user } from "src/libs/auth";
import { database } from "src/libs/db";
import {
  createWalletTransaction,
  deleteWalletTransaction,
  getAllWalletTransactions,
  getWalletTransactionById,
  updateWalletTransaction,
} from "src/libs/transactions";
import { models } from "src/models/transactions";

const transactions = (app: Elysia) =>
  app
    .use(authenticated)
    .use(database)
    .use(models)
    .use(user)
    .get(
      "/wallets/:walletId/transactions/:transactionId",
      ({ user, params: { walletId, transactionId }, db }) =>
        getWalletTransactionById(user.uid, walletId, transactionId, db),
      { params: "wallet-transaction-get-by-id-params" }
    )
    .get(
      "/wallets/:walletId/transactions",
      ({ user, params: { walletId }, db }) =>
        getAllWalletTransactions(user.uid, walletId, db),
      { params: "wallet-transactions-params" }
    )
    .post(
      "/wallets/:walletId/transactions",
      ({ user, params: { walletId }, body, db }) =>
        createWalletTransaction(walletId, body, db),
      { body: "wallet-transaction-create-body" }
    )
    .patch(
      "/wallets/:walletId/transactions/:transactionId",
      ({ user, params: { walletId, transactionId }, body, db }) =>
        updateWalletTransaction(user.uid, walletId, transactionId, body, db),
      { body: "wallet-transaction-update-body" }
    )
    .delete(
      "/wallets/:walletId/transactions/:transactionId",
      ({ user, params: { walletId, transactionId }, db }) =>
        deleteWalletTransaction(user.uid, walletId, transactionId, db),
      { params: "wallet-transaction-delete-by-id-params" }
    );

export { transactions };
