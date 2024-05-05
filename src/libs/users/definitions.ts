type CreateUserDto = {
  email: string;
  name: string;
};

type UpdateUserDto = Partial<CreateUserDto>;

export type { CreateUserDto, UpdateUserDto };
