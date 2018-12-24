var config = require('./../../config');
module.exports = {
    "viewsUrl": "./../views/",
    "dataUrl": "./../data/",
    "otherUrl": {},
    "info": {

        //==========================================================airEye
        "index": {
            "href": "/hyfnode/",
            "url": "index",
            "css": ["index"],
            "jsPageId": ["index"]
        },
        "index_introduce": {
            "href": "/hyfnode/info/introduce",
            "url": "/info/index_introduce",
            "css": ["index"],
            "jsPageId": ["index"]
        },
        "index_priceword": {
            "href": "/hyfnode/info/priceword",
            "url": "/info/index_priceword",
            "css": ["index"],
            "jsPageId": ["index"]
        },
        "index_process": {
            "href": "/hyfnode/info/process",
            "url": "info/index_process",
            "css": ["index"],
            "jsPageId": ["index"]
        },
        "index_servicearea": {
            "href": "/hyfnode/info/servicearea",
            "url": "/info/index_servicearea",
            "css": ["servicearea"],
            "jsPageId": ["index"]
        },
        "index_washdesc": {
            "href": "/hyfnode/info/washdesc",
            "url": "/info/washdesc",
            "css": ["washdesc"],
            "jsPageId": ["washdesc"]
        },
        "index_washprice": {
            "href": "/hyfnode/washprice",
            "url": "/washprice",
            "css": ["washprice"],
            "jsPageId": ["washprice"]
        },
        "order": {
            "href": "/hyfnode/order",
            "url": "order",
            "css": ["order"],
            "jsPageId": ["order"]
        },
        "orderplace": {
            "href": "/hyfnode/orderplace",
            "url": "orderplace",
            "css": ["orderplace"],
            "jsPageId": ["orderplace"],
            "mustLogin": true
        },
        "addresslist": {
            "href": "/hyfnode/addresslist",
            "url": "addresslist",
            "css": ["addresslist"],
            "jsPageId": ["addresslist"],
            "mustLogin": true
        },
        "timectr": {
            "href": "/hyfnode/timectr",
            "url": "timectr",
            "css": ["timectr"],
            "jsPageId": ["timectr"],
            "mustLogin": true
        },
        "recharge": {
            "href": "/hyfnode/recharge",
            "url": "recharge",
            "css": ["recharge"],
            "jsPageId": ["recharge"],
            "mustLogin": true
        },
        "recharge_pay": {
            "href": "/hyfnode/recharge_pay",
            "url": "recharge_pay",
            "css": ["recharge_pay"],
            "jsPageId": ["recharge_pay"],
            "mustLogin": true
        },
        "order_pay": {
            "href": "/hyfnode/order_pay",
            "url": "order_pay",
            "css": ["recharge_pay"],
            "jsPageId": ["order_pay"],
            "mustLogin": true
        },
        "logictics": {
            "href": "/hyfnode/logictics",
            "url": "logictics",
            "css": ["logictics"],
            "jsPageId": ["logictics"],
            "mustLogin": true
        },
        "orderdetail": {
            "href": "/hyfnode/orderdetail",
            "url": "orderdetail",
            "css": ["orderdetail"],
            "jsPageId": ["orderdetail"],
            "mustLogin": true
        },
        "login": {
            "href": "/hyfnode/login",
            "url": "login",
            "css": ["login"],
            "jsPageId": ["login"]
        },
        "editplace": {
            "href": "/hyfnode/editplace",
            "url": "editplace",
            "css": ["editplace"],
            "jsPageId": ["editplace"],
            "mustLogin": true
        },
        "usercenter": {
            "href": "/hyfnode/usercenter",
            "url": "usercenter",
            "css": ["usercenter"],
            "jsPageId": ["usercenter"]
        },
        "usercenter_more": {
            "href": "/hyfnode/usercenter/more",
            "url": "/usercenter_more",
            "css": ["more"],
            "jsPageId": ["more"],
            "mustLogin": true
        },
        "usercenter_question": {
            "href": "/hyfnode/info/question",
            "url": "/info/question",
            "css": ["question"],
            "jsPageId": ["question"]
        },
        "usercenter_useragree": {
            "href": "/hyfnode/info/useragree",
            "url": "/info/useragree",
            "css": ["useragree"],
            "jsPageId": ["useragree"]
        },
        "feedback": {
            "href": "/hyfnode/feedback",
            "url": "feedback",
            "css": ["feedback"],
            "jsPageId": ["feedback"],
            "mustLogin": true
        },
        "regist": {
            "href": "/hyfnode/regist",
            "url": "regist",
            "css": ["regist"],
            "jsPageId": ["regist"],
        }, "findpassword": {
            "href": "/hyfnode/findpassword",
            "url": "findpassword",
            "css": ["regist"],
            "jsPageId": ["findpassword"],
        },
        "zhaomu": {
            "href": "/hyfnode/zhaomu",
            "url": "zhaomu",
            "css": ["more"],
            "jsPageId": ["more"]
        },
        "*": {
            "href": "/hyfnode/*",
            "url": "index",
            "css": ["index"],
            "jsPageId": ["index"]
        }
    }
};