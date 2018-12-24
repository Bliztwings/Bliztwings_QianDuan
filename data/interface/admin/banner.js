var Mock = require("mockjs");
var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var bannerModel = require(path.join(process.cwd(), 'data/models/bannerModel'));



var bannerList = [
    {
        "id":"rwerwerwerwereewrwer",
        "name":"aaaaa",
        "seq":1,
        "imgPath":"sdsdsd",
        "jumpPath":"wewewew",
        "target":2
    },
    {
        "id":"rwerwerwerrwerewrwer",
        "name":"aaaaa",
        "seq":1,
        "imgPath":"sdsdsd",
        "jumpPath":"wewewew",
        "target":2
    },
    {
        "id":"rwerwerwehrwerewrwer",
        "name":"aaaaa",
        "seq":1,
        "imgPath":"sdsdsd",
        "jumpPath":"wewewew",
        "target":2
    },
    {
        "id":"rwerwerwerwerewrjwer",
        "name":"aaaaa",
        "seq":1,
        "imgPath":"sdsdsd",
        "jumpPath":"wewewew",
        "target":2
    },
];

/**
 * 获取轮播图列表
 **/
exports.getBannerList = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    bannerModel.queryPaging(queryInfo,function(data){
        interfaceModel.sendJson(res,200,data);
    });
};

/**
 * 新增轮播图
 * name
 * seq
 * imgPath
 * jumpPath
 * target
 * validityDate
 **/
exports.addBanner = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req, res);
    bannerModel.insert(queryInfo,function(data){
        interfaceModel.sendJson(res,200,data);
    });
};

/**
 * 修改轮播图
 * seq
 * imgPath
 * jumpPath
 * target
 * validityDate
 **/
exports.updateBanner = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req, res);
    bannerModel.update(queryInfo,function(data){
        interfaceModel.sendJson(res,200,data);
    });
};

/**
 * 删除轮播图
 * id
 **/
exports.delBanner = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req, res);

    bannerModel.del(queryInfo.id,function(data){
        interfaceModel.sendJson(res,200,data);
    });
};
