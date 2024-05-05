type CreateUserDto = {
  email: string;
  name: string;
};

type UpdateUserDto = Partial<CreateUserDto> & { id: string };

export type { CreateUserDto, UpdateUserDto };
