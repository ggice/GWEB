//@GGICE

var views = require('co-views');
var router = require('koa-router')();
var koa = require('koa');
var app = module.exports = koa();


// setup views, appending .dot
// when no extname is given to render()

var render = views(__dirname + '/views', {ext: 'dot'});
app.use(function *(next) {
    this.render = render;
    yield next;
});

// routes
require("./config/routes")(app, router);

if (!module.parent) app.listen(4000, function () {
    console.log('\x1b[32m listening to http://localhost:4000');
});