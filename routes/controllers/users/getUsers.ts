import { RouterContext, helpers } from "../../../deps.ts";
import { v1 } from "https://deno.land/std@0.180.0/uuid/mod.ts";


export interface User {
    adminToken: string | number[]
    userName: string,
    password: string
}


export let users: User[] = [{
    adminToken: v1.generate(),
    userName: "Ryan Castro",
    password: "ADWgwwa123"
}];

export const getUsersObject = () => users;

export const setUsers = (newUsers: typeof users) => {
    users = newUsers;
}


// deno-lint-ignore no-explicit-any
export const getUsers = async (ctx: RouterContext<any>) => {

    // deno-lint-ignore no-unused-vars
    const queries = await helpers.getQuery(ctx);
    
    ctx.response.body = {
        message: "succesful Query",
        users
    };
};
