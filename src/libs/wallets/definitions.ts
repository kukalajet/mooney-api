import { WalletType } from "@prisma/client";

type CreateWalletDto = {
  type: WalletType;
};

type UpdateWalletDto = Partial<CreateWalletDto> & { id: string };

export type { CreateWalletDto, UpdateWalletDto };
