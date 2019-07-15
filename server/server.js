const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const app = new Koa();

router.post('/test', async (ctx, next) => {
  let test = ctx.request.body.test;
  ctx.response.body = {
    test: 'Hello ' + test
  };
  await next();
});

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.listen(3141);
console.log('app started at port 3141...');
