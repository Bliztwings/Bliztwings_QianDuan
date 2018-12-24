var path = require('path');
var _ = require('underscore')
var _moment = require('moment')
var userModel = require(path.join(process.cwd(), 'data/models/userModel'));

//设置当前页面路径和上一页面路径
module.exports.setCurrentPage = function (req, currentHref) {
    if (req && req.session) {
        req.session.prevPage = req.session.currentPage || "/";
        req.session.currentPage = currentHref;
        console.log('=========================Prev pages was:' + (req.session.prevPage ) + '=========================');
        console.log('=========================Current pages was:' + (req.session.currentPage) + '=========================');
    }
}

//返回上一页面路径
module.exports.getLastPage = function (req) {
    return (req && req.session && req.session.prevPage) || null;
}


//////////////////////////////////////保存当前sessionID/////////////////////////////////////////////////////////


//////////////////////////////////////用户信息/////////////////////////////////////////////////////////
//设置用户信息到session中
module.exports.setSessionUserInfo = function (req, userInfo) {
    if (req && req.session) {
        var thisUserInfo = null;
        if (userInfo) {
            thisUserInfo = new userModel.UserInfo(userInfo);
        }
        console.log(thisUserInfo);
        req.session.userInfo = thisUserInfo;
    }
}
//从session中获取用户信息
module.exports.getSessionUserInfo = function (req) {
    return (req && req.session && req.session.userInfo) || null;
}
//判断用户是否登录
module.exports.hasLogin = function (req) {
    if (req && req.session && req.session.userInfo) {
        return true;
    }
    return false;
}
//设置用户是否当天的第一次登录
module.exports.setFirstLoginCurrentDay = function (req, bl) {
    if (req && req.session) {
        req.session.isFirstLoginCurrentDay = bl;
    }
}
//返回用户是否当天的第一次登录
module.exports.isFirstLoginCurrentDay = function (req) {
    if (req && req.session && req.session.isFirstLoginCurrentDay) {
        return true;
    }
    return false;
}


//获取session的id
module.exports.getSessionId = function (req) {
    if (req) {
        return req.sessionID;
    }
    return "";
}

//session
//req.session.destroy 摧毁一个session，后重新生成一个新的session
//req.session.reload  重新加载session


//设置用户登录之前的url
module.exports.setBeforeLoginUrl = function (req, url) {
    if (req && req.session) {
        req.session.beforeLoginUrl = url || "/";
    }
}
//从session中获取用户登录之前的url
module.exports.getBeforeLoginUrl = function (req) {
    return (req && req.session && req.session.beforeLoginUrl) || "/";
}


//设置查询航班信息
module.exports.setFlightInfo = function (req) {
    if (req && req.session) {
        req.session.flightInfo = {
            "cityList": [req.body["outboundOption.originLocationCode"], req.body["outboundOption.destinationLocationCode"]],
            "tripType": req.body["tripType"]
        };
    }
}
//获取查询航班信息
module.exports.getFlightInfo = function (req) {
    return (req && req.session && req.session.flightInfo) || [];
}
//保存人机验证成功的信息
module.exports.setMMVInfo = function (req, info) {
    if (req && req.session && info) {
        if (!req.session.MMVInfo) {
            req.session.MMVInfo = {};
        }
        req.session.MMVInfo[info.id] = info.guid;
    }
}
//获取人机验证guid
module.exports.judgeMMVResult = function (req, guid) {
    console.log("==============================judgeMMVResult");
    console.log(guid);
    console.log(req.session.MMVInfo);
    var arr = (guid || "").split("@");
    var id = arr[0];
    guid = arr[1];
    var thisMMV = "";
    var tips = "";
    if (req.session) {
        if (req.session.MMVInfo) {
            thisMMV = req.session.MMVInfo[id] || "";
            if (guid && thisMMV == guid) {
                tips = "";
            } else {
                tips = "人机验证失效，请刷新页面重新进行人机验证！";
            }
        } else {
            tips = "您的当前会话超时，请刷新页面重新进行人机验证！";
        }
    }

    return tips;
}

//保存人机验证guid
module.exports.setOrderNo = function (req, orderNo) {
    if (req && req.session) {
        req.session.orderNo = orderNo || "";
    }
}
//获取人机验证guid
module.exports.getOrderNo = function (req) {
    return req.session.orderNo || ""
}

//保存手机验证码
module.exports.setMobileCode = function (req, mobile, code) {
    if (req && req.session) {
        var mobileCodeList = req.session.mobileCodeList || [];
        var mobileCode = _.filter(mobileCodeList, function (item) {
            return item.mobile != mobile;
        })
        mobileCode.push({
            "mobile": mobile,
            "mobileCode": code,
            "time": _moment().format('YYYYMMDDHHmmss')
        })

        req.session.mobileCodeList = mobileCode;
    }
}
//获取手机验证码
module.exports.getMobileCode = function (req, mobile) {
    if (req && req.session) {
        var mobileCodeList = req.session.mobileCodeList || [];
        var mobileCode = _.filter(mobileCodeList, function (item) {
            return item.mobile == mobile;
        })
        if (mobileCode.length == 0)
            return "";

        return mobileCode[0].mobileCode;
    }
    return "";
}

//检查是否已经发送手机验证码
module.exports.checkMobileCode = function (req, mobile) {
    if (req && req.session) {

        var mobileCodeList = req.session.mobileCodeList || [];
        var mobileCode = _.filter(mobileCodeList, function (item) {
            return item.mobile == mobile;
        });

        if (mobileCode.length == 0)
            return true;

        var mobileItem = mobileCode[0];
        var mobileTime = _moment(mobileItem.time, "YYYYMMDDHHmmss");
        var timeDiff = _moment().diff(mobileTime) / 1000;
        if (timeDiff < 60 * 3)
            return false;
        else
            return true;
    }
    return false;
}


//保存邮箱验证码
module.exports.setEmailCode = function (req, email, code) {
    if (req && req.session) {
        var EmailCodeList = req.session.EmailCodeList || [];
        var emailCode = _.filter(EmailCodeList, function (item) {
            return item.email != email;
        })
        emailCode.push({
            "email": email,
            "emailCode": code,
            "time": _moment().format('YYYYMMDDHHmmss')
        })

        req.session.EmailCodeList = emailCode;
    }
}
//获取邮箱验证码
module.exports.getEmailCode = function (req, email) {
    if (req && req.session) {
        var EmailCodeList = req.session.EmailCodeList || [];
        var emailCode = _.filter(EmailCodeList, function (item) {
            return item.email == email;
        })
        if (emailCode.length == 0)
            return "";

        return emailCode[0].emailCode;
    }
    return "";
}

//检查是否已经发送手机验证码
module.exports.checkEmailCode = function (req, email) {
    if (req && req.session) {

        var EmailCodeList = req.session.EmailCodeList || [];
        var emailCode = _.filter(EmailCodeList, function (item) {
            return item.email == email;
        });

        if (emailCode.length == 0)
            return true;

        var emailItem = emailCode[0];

        var emailTime = _moment(emailItem.time, "YYYYMMDDHHmmss");
        var timeDiff = _moment().diff(emailTime) / 1000
        if (timeDiff < 60 * 3)
            return false;
        else
            return true;
    }
    return false;
}