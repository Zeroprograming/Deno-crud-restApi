import { RouterContext } from "../../../deps.ts";
import { getUsersObject, setUsers, users } from "./getUsers.ts";
import { VerifyRequest } from "./getUser.ts";

export const deleteUsers = async (ctx: RouterContext<string>) => {
  const id: VerifyRequest = await ctx.params;
  
  const usersToFilter = getUsersObject();

  const filteredUsers = usersToFilter.filter(user => user.adminToken !== id.id);
  
  setUsers(filteredUsers);
  ctx.response.status= 200;

  ctx.response.body = {
    message: "User deleted succesfully",
    users
  };
};
