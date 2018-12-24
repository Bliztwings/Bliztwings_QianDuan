var Mock = require("mockjs");
var path = require('path');
var fs = require("fs");
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/' + config.company + '/interface/interfaceModel'));
var rulesModel = require(path.join(process.cwd(), 'data/models/rulesModel'));
/**
 * 添加
 **/
exports.addRules = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req, res);
     rulesModel.insert(queryInfo,function(data){
         interfaceModel.sendJson(res,200,data);
     });
};
/**
 * 获取标题检查是否重复
 **/
exports.isExistByName = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req, res);
    rulesModel.queryOne(queryInfo,function(data){
        interfaceModel.sendJson(res,200,data);
    });
};
/**
 * 获取整个表格
 **/
exports.getRulesTable = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req, res);
    rulesModel.queryAll(queryInfo,function(data){
        interfaceModel.sendJson(res,200,data);
    });
};
/**
 * 获取某一条数据
 **/
exports.getRulesName = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req, res);
    rulesModel.queryOneByName(queryInfo,function(data){
        interfaceModel.sendJson(res,200,data);
    });
};


/**
 * 修改某一条数据
 **/
exports.modifyRules = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req, res);
    rulesModel.update(queryInfo,function(data){
        interfaceModel.sendJson(res,200,data);
    });
};
/**
 * 修改某一条数据
 **/
exports.deleteRules = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req, res);
    rulesModel.del(queryInfo,function(data){
        interfaceModel.sendJson(res,200,data);
    });
};

