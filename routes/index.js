module.exports = function *(next) {
    this.body = yield this.render('index', {name: 'xiao ming'});
};