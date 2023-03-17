import { oakCors, Router } from "../deps.ts";

const router = new Router();

router.get("/", ({response}) => {
    response.body = "Hello World"
} );

export default router