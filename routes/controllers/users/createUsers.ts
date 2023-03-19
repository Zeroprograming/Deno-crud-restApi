import { RouterContext } from "../../../deps.ts";
import { User, setUsers, getUsersObject } from "./getUsers.ts";
import { v1 } from "https://deno.land/std@0.180.0/uuid/mod.ts";

// deno-lint-ignore no-explicit-any
export const createUsers = async (ctx: RouterContext<any>) => {
    
    
    if (!ctx.request.hasBody) {
        ctx.response.status = 404;
        ctx.response.body = {
            'response': "Invalid Request."
        };
        
        return;
    }

    const body = await ctx.request.body();
    const newUser: User = await body.value;
    newUser.adminToken = v1.generate();
    const users = getUsersObject();
  
    users.push(newUser);
    setUsers(users);
  
    ctx.response.status = 200;
    ctx.response.body = {
      message: "New user created",
      newUser,
    };

  
};
