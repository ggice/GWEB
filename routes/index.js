"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String
});

var user = mongoose.model('user', userSchema);

module.exports = function *(next) {
    var users = yield user.find(function(err, users){
        if(err) return console.err(err);
        return users;
    });
    this.body = yield this.render('index', {name: users[0].name});
};