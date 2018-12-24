var express = require('express');
var path = require('path');
var mock = require('mockjs')
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/interface/interfaceModel'));
var utils = require('../utils')
var _ = require('underscore')
var WXPay = require('weixin-pay');


var moment = require('../../tools/moment');

module.exports.createorder = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }

    var order = {
        "memberId": utils.GetUserInfo(req).id,
        "openId": (queryInfo.openid || req.session.openid) || "",
        "telephone": queryInfo.telephone || mock.mock(/^[1][8][0-9]{9}$/),
        "clothesCount": queryInfo.clothesCount || 11,
        "orderAddress": queryInfo.orderAddress || mock.mock('@county(true)'),
        "placeOrderDate": queryInfo.placeOrderDate || mock.mock('@date("yyyyMMddhhmmss")'),
        "placeOrderDateArea": queryInfo.placeOrderDateArea || "10点-12点",
        "leaveMessage": queryInfo.leaveMessage || "一定要好好洗啊",
        "serviceItem": queryInfo.serviceItem || "1",
        "longitude": queryInfo.longitude || mock.mock('@float(60, 100, 3)'),
        "latitude": queryInfo.latitude || mock.mock('@float(60, 100, 3)')
    };

    console.log(order)
    var registurl = config.o2ourl + "/o2o/order"
    interfaceModel.PostForm(req, registurl, order, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });

}


module.exports.sign = function (req, res, next) {
    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    var queryInfo = interfaceModel.getParameter(req);

    var registurl = config.o2ourl + "o2o/signOrder/" + queryInfo.orderid;

    interfaceModel.PostForm(req, registurl, {}, function (body) {
        console.log("sign:" + JSON.stringify(body))
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    }, "GET");
}


module.exports.pay = function (req, res, next) {

    var queryInfo = interfaceModel.getParameter(req);
    var address = {
        "orderId": queryInfo.orderId,
        "orderAmount": parseFloat(queryInfo.orderAmount) || 0,
        "freight": parseFloat(queryInfo.freight) || 0,
        "mobilePhone": utils.GetUserInfo(req).mobilePhone,
        "memberId": utils.GetUserInfo(req).id,
        "payType": "2"
    }

    var registurl = config.o2ourl + "o2o/pay"
    interfaceModel.PostForm(req, registurl, address, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });
}

//物流接口
module.exports.orderlocation = function (req, res, next) {

    var queryInfo = interfaceModel.getParameter(req);
    var address = {
        orderId: queryInfo.orderid
    };

    var registurl = config.o2ourl + "/o2o/queryOrderLogisticsInfo?orderId=" + address.orderId
    interfaceModel.PostForm(req, registurl, {}, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });
}

//获取订单列表
module.exports.orderlist = function (req, res, next) {


    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    var address = {
        mobile: utils.GetUserInfo(req).mobilePhone,
        pageNo: 1,
        pageSize: 100
    };

    var registurl = config.o2ourl + "o2o/memberOrder/" + utils.GetUserInfo(req).mobilePhone + "/" + address.pageNo + "/" + address.pageSize;
    interfaceModel.PostForm(req, registurl, address, function (body) {
        // console.log(body)
        if (body.resCode == "0000" && body.obj.length > 0) {
            var orderlist = [];
            _.each(body.obj, function (item) {
                if (item.orderStatus) {
                    orderlist.push({
                        id: item.id,
                        serviceitem: item.serviceItem,
                        orderCode: item.orderCode,
                        orderstate: item.orderStatus,
                        time: moment(item.placeOrderDate).format('YYYY-MM-DD') + " " + item.placeOrderDateArea,
                        location: item.logistics || [{
                            "id": "c3b37a3d77a549928817bc3b588a1a68",
                            "orderId": "af28bcb90e0e45c7a2f573d6496dc42d",
                            "orderStatus": "20",
                            "content": "订单已经预约成功，等待分配小浣",
                            "createTime": 1507267630000,
                            "createUser": null,
                            "updateTime": null,
                            "updateUser": null,
                            "isDeleted": null
                        }]
                    })
                }
            })
            interfaceModel.sendJson(res, 200, orderlist);
        }
        else
            interfaceModel.sendJson(res, 200, []);
    }, function (err) {
        res.json(err);
    }, "GET");

}


module.exports.orderdetail = function (req, res, next) {

    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    var queryInfo = interfaceModel.getParameter(req);

    var registurl = config.o2ourl + "o2o/orderDetail/" + queryInfo.orderid;

    interfaceModel.PostForm(req, registurl, {}, function (body) {
        console.log(body)
        if (body.resCode == "0000") {
            body.obj.placeOrderDate = moment(body.obj.placeOrderDate).format('YYYY-MM-DD')
            _.each(body.obj.logistics, function (item) {
                item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
            });
            body.obj.serviceItem = GetServiceType(body.obj.serviceItem)
        }
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    }, "GET");
}

function GetServiceType(type) {
    switch (type) {
        case "1":
            return "洗衣";
        case "2":
            return "洗鞋";
        case "3":
            return "洗家纺";
        case "4":
            return "洗家纺";
        default:
            return "洗衣";
    }
}


module.exports.cancelorder = function (req, res, next) {
    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    var queryInfo = interfaceModel.getParameter(req);

    var registurl = config.o2ourl + "o2o/cancalOrder/" + queryInfo.orderid;

    interfaceModel.PostForm(req, registurl, {}, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });
}


module.exports.prepay = function (req, res, next) {
    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    var queryInfo = interfaceModel.getParameter(req);
    console.log("prepay openid:" + req.session.openid)
    var param = {
        "orderId": (queryInfo.orderid || req.session.openid) || "",
        "orderAmount": parseFloat(queryInfo.amount) || 0,
        "ipAddress": get_client_ip(req),
        "openId": queryInfo.openid || "",
        "type": queryInfo.orderid ? "1" : "2",
        "memberId": utils.GetUserInfo(req).id,
        "memberCardId": req.session.recharge.cardNumber
    }


    var registurl = config.o2ourl + "o2o/prepayOrder";

    interfaceModel.PostForm(req, registurl, param, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });
}

module.exports.changetime = function (req, res, next) {
    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    var queryInfo = interfaceModel.getParameter(req);

    var registurl = config.o2ourl + "o2o/updateApointmentTime";
    var address = {
        id: queryInfo.id,
        placeOrderDate: queryInfo.date,
        placeOrderDateArea: queryInfo.time
    };

    interfaceModel.PostForm(req, registurl, address, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });
}


/*
 * 获取访问客户端的IP
 * */
function get_client_ip(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    console.log("visit IP:" + ip);
    return ip;
};

module.exports.prepay2 = function (req, res, next) {
    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    var queryInfo = interfaceModel.getParameter(req);

    var wxpay = WXPay({
        appid: config.wechat.appid,
        mch_id: '1399294002',
        partner_key: 'e559498d08e94d70b99586fb06c5ba22', //微信商户平台API密钥
        // pfx: fs.readFileSync('./wxpay_cert.p12'), //微信商户平台证书
    });

    var requestObj = {
        openid: (queryInfo.openid || req.session.openid) || "",
        body: '公众号支付测试',
        detail: '公众号支付测试',
        out_trade_no: moment().format('YYYYMMDD') + Math.random().toString().substr(2, 10),
        total_fee: 1,
        spbill_create_ip: get_client_ip(req),
        notify_url: 'http://118.178.134.100:8081/ewashing/weixinCallBack/weixin'
    }

    console.log(requestObj)
    wxpay.getBrandWCPayRequestParams(requestObj, function (err, result) {
        console.log(result)
        interfaceModel.sendJson(res, 200, {resCode: "0000", "obj": result});
        // in express
        // res.render('wxpay/jsapi', {payargs: result})
    })
    ;

}
