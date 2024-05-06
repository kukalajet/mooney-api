import type Elysia from "elysia";
import { t } from "elysia";

const CreateTransactionBodyDto = t.Object({
  walletId: t.String(),
});

const UpdateTransactionBodyDto = t.Partial(CreateTransactionBodyDto);

const GetAllWalletTransactionsParamsDto = t.Object({ walletId: t.String() });

const GetTransactionByIdParamsDto = t.Object({
  walletId: t.String(),
  transactionId: t.String(),
});

const DeleteTransactionByIdParamsDto = t.Object({
  walletId: t.String(),
  transactionId: t.String(),
});

const models = (app: Elysia) =>
  app
    .model("wallet-transaction-create-body", CreateTransactionBodyDto)
    .model("wallet-transaction-update-body", UpdateTransactionBodyDto)
    .model("wallet-transaction-get-by-id-params", GetTransactionByIdParamsDto)
    .model("wallet-transactions-params", GetAllWalletTransactionsParamsDto)
    .model(
      "wallet-transaction-delete-by-id-params",
      DeleteTransactionByIdParamsDto
    );

export { models };
