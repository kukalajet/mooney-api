import { t } from "elysia";
import type Elysia from "elysia";

const UserSignUpBodyDto = t.Object({
  email: t.String({ format: "email" }),
  name: t.String({ minLength: 3 }),
});

const UserGetByIdParamsDto = t.Object({ id: t.String() });

const UserPatchDto = t.Partial(UserSignUpBodyDto);

const models = (app: Elysia) =>
  app
    .model("user-sign-up-body", UserSignUpBodyDto)
    .model("user-get-by-id-params", UserGetByIdParamsDto)
    .model("user-patch-body", UserPatchDto);

export { models, UserSignUpBodyDto, UserGetByIdParamsDto };
