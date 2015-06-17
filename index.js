"use strict";
//@GGICE

var views = require('co-views');
var router = require('koa-router')();
var koa = require('koa');
var mongoose = require("mongoose");
var statics = require('koa-static-folder');
var app = module.exports = koa();

//config
var config = require('./config/config');

//statics
app.use(statics('./assets'));

//connect to database
var mongoUrl = config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database;
mongoose.connect(mongoUrl);
mongoose.connection.on("error", function (err) {
    console.log(err);
});

// setup views, appending .dot
// when no extname is given to render()
var render = views(__dirname + '/views', {ext: 'ejs'});
app.use(function *(next) {
    this.render = render;
    yield next;
});

// routes
require("./config/routes")(app, router);

if (!module.parent) app.listen(config.port, function () {
    console.log('\x1b[32m listening to http://localhost:4000');
});