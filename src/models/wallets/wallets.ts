import { WalletType } from "@prisma/client";
import { t } from "elysia";
import type Elysia from "elysia";

const CreateUserWalletBodyDto = t.Object({
  type: t.Enum(WalletType),
});

const UpdateUserWalletBodyDto = t.Partial(CreateUserWalletBodyDto);

const UpdateUserWalletParamsDto = t.Object({ walletId: t.String() });

const GetUserWalletByIdParamsDto = t.Object({ walletId: t.String() });

const DeleteUserWalletByIdParamsDto = t.Object({ walletId: t.String() });

const models = (app: Elysia) =>
  app
    .model("user-wallet-create-body", CreateUserWalletBodyDto)
    .model("user-wallet-update-body", UpdateUserWalletBodyDto)
    .model("user-wallet-update-params", UpdateUserWalletParamsDto)
    .model("user-wallet-get-by-id-params", GetUserWalletByIdParamsDto)
    .model("user-wallet-delete-by-id-params", DeleteUserWalletByIdParamsDto);

export { models };
