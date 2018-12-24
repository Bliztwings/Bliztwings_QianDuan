var path = require('path');
var _config = require(path.join(process.cwd(), 'config'));
var request = require('request');
var config = _config.wechat;


module.exports.wx_login = function (req, res, next) {
    console.log("oauth - login")
    console.log("wechat_config:" + JSON.stringify(config))
    // 第一步：用户同意授权，获取code
    var router = 'get_wx_access_token';
    // 这是编码后的地址
    var return_uri = url_encode('http://' + config.domain + '/hyfnode/wx/' + router);
    var scope = 'snsapi_userinfo';

    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + return_uri + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect');
}

/* 获取access_token */
module.exports.get_wx_access_token = function (req, res, next) {
    console.log("get_wx_access_token")
    console.log("code_return: " + req.query.code)


    console.log("wechat_config AppID:" + config.appid + "|AppSecret:" + config.appsercet)
    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    request.get(
        {
            url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config.appid + '&secret=' + config.appsercet + '&code=' + code + '&grant_type=authorization_code',
        },
        function (error, response, body) {
            if (response.statusCode == 200) {

                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var access_token = data.access_token;
                var openid = data.openid;
                console.log('openid:' + openid);
                if (req.session)
                    req.session.openid = openid

                res.redirect('/hyfnode/index?openid=' + openid)
                return;
                request.get(
                    {
                        url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN',
                    },
                    function (error, response, body) {
                        if (response.statusCode == 200) {

                            // 第四步：根据获取的用户信息进行对应操作
                            var userinfo = JSON.parse(body);
                            //console.log(JSON.parse(body));
                            console.log('获取微信信息成功！' + userinfo.nickname + userinfo.city + userinfo.country);

                            // 小测试，实际应用中，可以由此创建一个帐户
                            res.send("\
                                <h1>" + userinfo.nickname + " 的个人信息</h1>\
                                <p><img src='" + userinfo.headimgurl + "' /></p>\
                                <p>" + userinfo.city + "，" + userinfo.province + "，" + userinfo.country + "</p>\
                            ");

                        } else {
                            console.log(response.statusCode);
                        }
                    }
                );
            } else {
                console.log(response.statusCode);
            }
        }
    );
};


module.exports.wx_user_login = function (req, res, next) {
    console.log("oauth - user_login")
    console.log("wechat_config:" + JSON.stringify(config))
    // 第一步：用户同意授权，获取code
    var router = 'get_wx_user_access_token';
    // 这是编码后的地址
    var return_uri = url_encode('http://' + config.domain + '/hyfnode/wx/' + router);
    var scope = 'snsapi_userinfo';

    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + return_uri + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect');
}

/* 获取access_token */
module.exports.get_wx_user_access_token = function (req, res, next) {
    console.log("get_wx_user_access_token")
    console.log("code_return: " + req.query.code)


    console.log("wechat_config AppID:" + config.appid + "|AppSecret:" + config.appsercet)
    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    request.get(
        {
            url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config.appid + '&secret=' + config.appsercet + '&code=' + code + '&grant_type=authorization_code',
        },
        function (error, response, body) {
            if (response.statusCode == 200) {

                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var openid = data.openid;
                console.log('openid:' + openid);
                if (req.session)
                    req.session.openid = openid

                res.redirect('/hyfnode/usercenter?openid=' + openid)

            } else {
                console.log(response.statusCode);
            }
        }
    );
};


module.exports.wx_order_login = function (req, res, next) {
    console.log("oauth - user_login")
    console.log("wechat_config:" + JSON.stringify(config))
    // 第一步：用户同意授权，获取code
    var router = 'get_wx_order_access_token';
    // 这是编码后的地址
    var return_uri = url_encode('http://' + config.domain + '/hyfnode/wx/' + router);
    var scope = 'snsapi_userinfo';

    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + return_uri + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect');
}

/* 获取access_token */
module.exports.get_wx_order_access_token = function (req, res, next) {
    console.log("get_wx_order_access_token")
    console.log("code_return: " + req.query.code)


    console.log("wechat_config AppID:" + config.appid + "|AppSecret:" + config.appsercet)
    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    request.get(
        {
            url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config.appid + '&secret=' + config.appsercet + '&code=' + code + '&grant_type=authorization_code',
        },
        function (error, response, body) {
            if (response.statusCode == 200) {

                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var openid = data.openid;
                console.log('openid:' + openid);
                if (req.session)
                    req.session.openid = openid

                res.redirect('/hyfnode/order?openid=' + openid)

            } else {
                console.log(response.statusCode);
            }
        }
    );
};

function url_encode(url) {
    return url;

    url = encodeURIComponent(url);
    url = url.replace(/\%3A/g, ":");
    url = url.replace(/\%2F/g, "/");
    url = url.replace(/\%3F/g, "?");
    url = url.replace(/\%3D/g, "=");
    url = url.replace(/\%26/g, "&");


}
