import { RouterContext } from "../../../deps.ts";
import { getUsersObject } from "./getUsers.ts";

export interface VerifyRequest {
  id?: string;
}

export const getUser = async (ctx: RouterContext<string>) => {
  const adminToken: VerifyRequest = await ctx.params; // Accede a los parámetros de la ruta

  const usertoFind = getUsersObject();
  const userFound = usertoFind.find((user) => user.adminToken === adminToken.id);
  if (userFound) {
    ctx.response.status = 200;
    ctx.response.body = {
      message: "You got a single user",
      userFound,
    };
  } else {
    ctx.response.status = 404;
    ctx.response.body = {
      message: "User Not found",
    };
  }
};
