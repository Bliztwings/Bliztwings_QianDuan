var express = require('express');
var path = require('path');
var fs = require("fs");
var favicon = require('serve-favicon');
var _ = require('underscore');

var cookieParser = require('cookie-parser');
var session = require('express-session');
// var RedisStore = require('./connect-ioredis')(session)
var bodyParser = require('body-parser');


var domain = require('domain')
var portArgv = parseInt(process.argv[2]);

var config = require('./config');

var app = express();

//设置监听端口
app.set('port', portArgv || process.env.PORT || config.port);
//设置模板的路径
app.set('views', path.join(__dirname, 'views'));
//设置静态文件的路径
app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'favicon.ico')));

//对请求内容进行解析，支持json、 application/x-www-form-urlencoded、multipart/form-data 格式数据的解析
//也就是说ajax和form发送请求时，都会经过它的处理，方便在req.body中获取相应的请求值
app.use(bodyParser());


// var redisHost = config.RedisHost.length == 1 ? config.RedisHost[0] : config.RedisHost[_.random(0, config.RedisHost.length - 1)];
var redisHost = config.RedisHost;

console.log(redisHost)
//设置session
app.use(cookieParser());
app.use(session({
    //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    name: 'testApp',

    // store: session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。Express 生态中都有相应模块的支持。
    // store: new RedisStore({
    // }),
    //通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
    secret: config.setting.cookieSecret,

    //设置存放 session id 的 cookie 的相关选项，默认为(default: { path: '/', httpOnly: true, secure: false, maxAge: null })
    //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    cookie: {maxAge: config.setting.sessionTimeOut},

    // genid: 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包。

    // rolling: 每个请求都重新设置一个 cookie，默认为 false。

    // resave: 即使 session 没有被修改，也保存 session 值，默认为 true。
    key: config.setting.db,

    saveUninitialized: true,
}));

//设置日志
require(path.join(process.cwd(), 'weblogs/logs/log')).use(app);

//执行hbs模板引擎
require('./hbs')(app);

//执行路由
require('./routes/index')(app);


var serviceDomain = domain.create();
serviceDomain.on('error', function (er) {
    console.error('Caught error!', er);
});
serviceDomain.run(function () {
    var port = app.get("port");
    app.listen(port);
    console.log("Server started, listen port " + port);
});

module.exports = app;
