var hbs = require('hbs');
var path = require('path');
var config = require('./config');
module.exports = function (app) {
    //运行hbs模板
    app.engine('html', hbs.__express);
    //设置模板引擎 指定模板文件的后缀名为html
    app.set('view engine', 'html');

    hbs.registerPartials(path.join(__dirname, 'views/' + config.company + '/partial'));

    //加载CSS
    hbs.registerHelper('css', function (str, option) {
        var cssList = this.cssList || [];
        if (!str) str = [];
        str.forEach(function (item) {
            if (cssList.indexOf(item) < 0) {
                cssList.push(item);
            }
        });
        this.cssList = cssList.concat();
    });
    //加载JS
    hbs.registerHelper('js', function (str, option) {
        var jsList = this.jsList || [];
        if (!str) str = [];
        str.forEach(function (item) {
            if (jsList.indexOf(item) < 0) {
                jsList.push(item);
            }
        });
        this.jsList = jsList.concat();
    });
    //判断语言
    hbs.registerHelper('langType', function (str, option) {
        if (str == "en") return "selected";
        return "";
    });
};