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
          "/",
          ({ user, body, db }) => updateUserWallet(user.uid, body, db),
          { body: "user-wallet-update-body" }
        )
        .delete(
          "/:id",
          ({ user, params: { id }, db }) => deleteUserWallet(user.uid, id, db),
          { params: "user-wallet-get-by-id-params" }
        )
        .get(
          "/:id",
          ({ user, params: { id }, db }) => getUserWalletById(user.uid, id, db),
          { params: "user-wallet-get-by-id-params" }
        )
    );

export { wallets };
