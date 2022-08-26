const mdRouter = require("../routers/deploy").routes();
const views = require("koa-views");
const logger = require("koa-logger");
const json = require("koa-json");
const mdViews = views(__dirname + '/../views', {
    extension: 'html'
})
const mbkoabodyparser = require("koa-bodyparser")()
const mdJson = json();
const mdlogger = logger();
const mdstatic = require('koa-static')(__dirname + '/../public')
module.exports=[
    mdViews,
    mbkoabodyparser,
    mdJson,
    mdlogger,
    mdstatic,
    mdRouter
]