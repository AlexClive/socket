const koa = require("koa")
    , compose = require("koa-compose")
    , md = require("./middleware/index");


const app = new koa();
app.use(compose(md));

module.exports = app;
