const koaRouter = require("koa-router");
const fs = require("fs");
const router = new koaRouter();
let urls = fs.readdirSync(__dirname + "/");
urls.forEach((element) => {
    router.get('/', async (ctx,next) => {
        await ctx.render("index");
    })
    if(element == 'deploy.js') return false;
    let module = require(__dirname + '/' + element);
    //  router.use('/' + element.replace("Router.js", ''), module.routes(), module.allowedMethods());
    router.use('/' + element.replace("Router.js", ''), module.routes(), module.allowedMethods());
})
module.exports = router;