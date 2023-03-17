import { Application } from "./deps.ts";

import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import router from "./routes/index.routes.ts";

const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());


console.log("Server runnin on port", 8000)
await app.listen({port: 8000});

