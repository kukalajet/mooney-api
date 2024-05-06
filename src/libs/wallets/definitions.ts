import { WalletType } from "@prisma/client";

type CreateWalletDto = {
  type: WalletType;
};

type UpdateWalletDto = Partial<CreateWalletDto>;

export type { CreateWalletDto, UpdateWalletDto };
