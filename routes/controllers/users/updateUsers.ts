import { RouterContext } from "../../../deps.ts";
import { getUsersObject, setUsers, users } from "./getUsers.ts";
import { VerifyRequest } from "./getUser.ts";


interface UserUpdate{
    adminToken?: string | number[]
    userName?: string;
    password?: string;
}

function isValidUserUpdate(data: any): data is UserUpdate {
    return (
        typeof data.id === "string" ||
        (Array.isArray(data.id) && data.id.every((i: number) => typeof i === "number")) ||
        data.id === undefined
    ) && (
        typeof data.userName === "string" || data.userName === undefined
    ) && (
        typeof data.password === "string" || data.password === undefined
    );
}


// deno-lint-ignore no-explicit-any
export const updateUsers = async (ctx: RouterContext<any>) => {
  const idToken: VerifyRequest = await ctx.params;

  let usersToUpdate = getUsersObject();

  const userFound = usersToUpdate.find((user) =>
    user.adminToken === idToken.id
  );

  if (!userFound) {
    ctx.response.status = 404;
    ctx.response.body = {
      message: "User not found",
    };
  } else {
    const body = await ctx.request.body();

   
    const updatedUserData = await body.value;

    if (isValidUserUpdate(updatedUserData)) {
        const updatedUser: UserUpdate = updatedUserData;
        updatedUser.adminToken = idToken.id; 

        usersToUpdate = usersToUpdate.map((user) =>
          user.adminToken === idToken.id ? { ...user, ...updatedUser } : user
        );

        setUsers(usersToUpdate);

        ctx.response.status = 200;
        ctx.response.body = {
          users,
        };
    }
  }
}
