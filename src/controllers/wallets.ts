import Elysia from "elysia";
import { authenticated, user } from "src/libs/auth";
import { database } from "src/libs/db";
import {
  createUserWallet,
  deleteUserWallet,
  getAllUserWallets,
  getUserWalletById,
  updateUserWallet,
} from "src/libs/wallets";
import { models } from "src/models/wallets";

const wallets = (app: Elysia) =>
  app
    .use(authenticated)
    .use(database)
    .use(models)
    .use(user)
    .group("/wallets", (app) =>
      app
        .get("/", ({ user, db }) => getAllUserWallets(user.uid, db))
        .post(
          "/",
          ({ user, body, db }) => createUserWallet(user.uid, body, db),
          { body: "user-wallet-create-body" }
        )
        .patch(
          "/:walletId",
          ({ user, body, params: { walletId }, db }) =>
            updateUserWallet(user.uid, walletId, body, db),
          {
            body: "user-wallet-update-body",
            params: "user-wallet-update-params",
          }
        )
        .delete(
          "/:walletId",
          ({ user, params: { walletId }, db }) =>
            deleteUserWallet(user.uid, walletId, db),
          { params: "user-wallet-get-by-id-params" }
        )
        .get(
          "/:walletId",
          ({ user, params: { walletId }, db }) =>
            getUserWalletById(user.uid, walletId, db),
          { params: "user-wallet-get-by-id-params" }
        )
    );

export { wallets };
