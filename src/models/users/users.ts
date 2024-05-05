import { t } from "elysia";
import type Elysia from "elysia";

const SignUpBodyDto = t.Object({
  email: t.String({ format: "email" }),
  name: t.String({ minLength: 3 }),
});

const GetByIdParamsDto = t.Object({ id: t.String() });

const models = (app: Elysia) =>
  app
    .model("user-sign-up-body", SignUpBodyDto)
    .model("user-get-by-id-params", GetByIdParamsDto);

export { models, SignUpBodyDto, GetByIdParamsDto };
