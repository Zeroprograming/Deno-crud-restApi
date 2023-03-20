import { getUsers } from "./controllers/users/getUsers.ts";
import { getUser } from "./controllers/users/getUser.ts";
import { createUsers } from "./controllers/users/createUsers.ts";
import { updateUsers } from "./controllers/users/updateUsers.ts";
import { deleteUsers } from "./controllers/users/deleteUsers.ts";
import { oakCors, Router } from "../deps.ts";

const router = new Router();

router.get("/", ({ response }) => {
  response.body = "Welcome to my API";
});

router.get("/users", oakCors(), getUsers);
router.get("/users/:id", oakCors(), getUser);
router.post("/users", oakCors(), createUsers);
router.delete("/users/:id", oakCors(), deleteUsers);
router.put("/users/:id", oakCors(), updateUsers);
export default router;
