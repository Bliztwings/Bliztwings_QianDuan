//'use strict';
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
const interfaceUrl = path.join(process.cwd(), 'data/interface');

var router = function (app) {
    app.use('/hyfnode/base', require(interfaceUrl + '/base'));
    app.use('/hyfnode/wx', require(interfaceUrl + '/wechat'));
};
module.exports = router;
