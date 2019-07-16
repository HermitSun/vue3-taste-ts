import Koa = require("koa");
import Router = require("koa-router");
import bodyParser = require("koa-bodyparser");
import cors = require("koa2-cors");

const app = new Koa();
const router = new Router();

router.post("/test", async (ctx, next) => {
    const test = ctx.request.body.test;
    ctx.response.body = {
        test: "Hello " + test,
    };
    await next();
});

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(3141);
console.log("server started at port 3141...");
