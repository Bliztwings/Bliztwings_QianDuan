var wechat = require('wechat');
var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));

var interfaceModel = require(path.join(process.cwd(), 'data/interface/interfaceModel'));

var verifyInfo = {  //验证信息
    token: config.wechat.token,  // your wechat token
    appid: config.wechat.appid  // your wechat appid
};
//处理文本消息
var handler = wechat(verifyInfo, wechat.text(wechatText));

function wechatText(message, req, res, next) {
    var input = (message.Content || '').trim();

    if (/你好/.test(input)) {
        res.reply('Hello world');
    } else {
        res.reply('其他');
    }
}


function orderplace(req, res, next) {
    interfaceModel.sendJson(res, 200, {"data": "微信测试成功"});
}


router.all('/index', orderplace);

router.all('/text', handler);
router.all('/test', require('./sign').sign);

router.all('/wx_login', require('./oauth').wx_login);
router.all('/get_wx_access_token', require('./oauth').get_wx_access_token);

router.all('/wx_user_login', require('./oauth').wx_user_login);
router.all('/get_wx_user_access_token', require('./oauth').get_wx_user_access_token);

router.all('/wx_order_login', require('./oauth').wx_order_login);
router.all('/get_wx_order_access_token', require('./oauth').get_wx_order_access_token);
module.exports = router;