var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var crossdomain = require(path.join(process.cwd(), 'data/interface/crossdomain'));
var compile = require(path.join(process.cwd(), 'data/tools/compile'));
var request = require("request")

function sendJson(res, code, results) {
    var returnObj = {
        code: code || 400
    };
    if (code == 200) {
        returnObj.data = results;
    } else {
        returnObj.message = results || "系统错误！";
    }

    res = crossdomain(res);
    setTimeout(function () {
        res.json(returnObj);
    }, 500);
}

module.exports.sendJson = sendJson;


module.exports.getParameter = function (req, res) {
    var queryInfo = null;
    var method = req.method;
    if (method == "POST") {
        queryInfo = req.body;
    } else if (method == "GET") {
        queryInfo = req.query;
    }
    if (queryInfo.q) {
        var q = queryInfo.q;
        if (config.env == 'production') {
            q = compile.uncompile(q);
        }
        queryInfo = JSON.parse(q);
    }
    return queryInfo;
}

//data是数组
//pageSize每页显示的数量
//pageCount总页数
//pageCurrent当前页
//total总条数
module.exports.getPagingInfo = function (data, pageSize, pageCount, pageCurrent, total) {
    var pageInfo = {
        data: data || [],
        pageSize: pageSize || 10,
        total: total || 0,
        pageCount: pageCount || 0,
        pageCurrent: pageCurrent || 0
    };
    return pageInfo;
}


module.exports.setPagingInfo = function (result, queryInfo) {
    //总数条
    var total = result.length;
    //每页的条数
    var pageSize = queryInfo.pageSize || 10;
    //总的页数
    var pageCount = Math.ceil(total / pageSize);
    var pageCurrent = parseInt(queryInfo.pageIndex || 1);
    pageCurrent = pageCurrent < 1 ? 1 : pageCurrent;
    var start = (pageCurrent - 1) * pageSize;
    var end = start + pageSize;
    var data = result.slice(start, end);

    return {
        data: data || [],
        pageSize: pageSize || 10,
        total: total || 0,
        pageCount: pageCount || 0,
        pageCurrent: pageCurrent || 0
    };
}

function getHeader(req) {
    return {
        "Content-Type": "application/json",
        "token": (req.session && req.session.token) ? req.session.token : "",
        "appid": config.wechat.appid
    };
};

function postForm(req, url, form, callback1, callback2, method) {
    console.log(url);
    console.log(form);
    var header = getHeader(req);
    console.log("header:" + JSON.stringify(header))

    var option = {};
    if (method && method == "GET") {
        option = {
            method: "GET",
            url: url,
            json: true,
            headers: header,
        };
    }
    else {
        option = {
            method: "POST",
            url: url,
            json: true,
            headers: header,
            body: form
        };
    }
    request(option, function (error, response, body) {
        if (response) {
            if (response.statusCode) console.log("statusCode:" + response.statusCode)
            // if (response.body) console.log("body:" + response.body)
        }
        if (!error && response && response.statusCode === 200) {
            callback1(body);
            console.log('request is success ');
        } else {
            console.log('request is error', error);
            console.log('request is body', body);
            var errorObj = {
                code: 900,
                "message": "您的会话已过期"
            };

            callback2({
                "q": JSON.stringify(errorObj)
            });
        }
    })
}

module.exports.PostForm = postForm;


module.exports.checkLogin = function (req, res, next) {
    if (!req.session.userInfo) {
        sendJson(res, 900, "请重新登录");
    } else {
        next();
    }
};

