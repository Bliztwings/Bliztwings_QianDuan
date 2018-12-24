var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));


var menuList = [
    {
        "id":1,
        "name":"首页配置",
        "spread":true,
        "children":[
            {
                "id":11,
                "name":"轮播图",
                "jumpPath":"/airM/admin/portal/banner",
                "url":""
            }
        ]
    },
    {
        "id":2,
        "name":"规章制度",
        "children":[
            {
                "id":21,
                "name":"规章制度列表",
                "jumpPath":"/airM/admin/rules/rulesList"
            },
            {
                "id":22,
                "name":"规章制度编辑",
                "jumpPath":"/airM/admin/rules/rulesEdit"
            }
        ]
    }
];
//获取菜单列表
/**
 * 查询菜单列表
 **/
exports.getMenuList = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req, res);
    interfaceModel.sendJson(res,200,{
        "data":menuList,
        "status":"success"
    });
};
