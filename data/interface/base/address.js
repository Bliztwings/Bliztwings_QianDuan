var express = require('express');
var path = require('path');
var mock = require('mockjs')
var config = require(path.join(process.cwd(), 'config'));
var interfaceModel = require(path.join(process.cwd(), 'data/interface/interfaceModel'));
var utils = require('../utils')

module.exports.add = function (req, res, next) {
    var queryInfo = interfaceModel.getParameter(req);
    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    var address = {
            memberId: utils.GetUserInfo(req).id,
            areaCode: queryInfo.city || mock.mock('@province'),
            areaName: queryInfo.area || mock.mock('@city'),
            homeAddress: queryInfo.address_line_1 || mock.mock('@county'),
            doorNumber: queryInfo.address_line_2 || mock.mock('@protocol'),
            customerName: queryInfo.username || mock.mock('@cname'),
            sex: ((queryInfo.gender && queryInfo.gender == "女士") ? "1" : "0") ||
            "0",
            telephone: queryInfo.tel || mock.mock(/^[1][8][0-9]{9}$/)
        }
        ;

    console.log(address)
    var registurl = config.o2ourl + "/o2o/registerAddress"
    interfaceModel.PostForm(req, registurl, address, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });

}

module.exports.update = function (req, res, next) {

    var queryInfo = interfaceModel.getParameter(req);
    var address = {
        id: queryInfo.id,
        areaCode: queryInfo.city || mock.mock('@province'),
        areaName: queryInfo.area || mock.mock('@city'),
        homeAddress: queryInfo.address_line_1 || mock.mock('@county'),
        doorNumber: queryInfo.address_line_2 || mock.mock('@protocol'),
        customerName: queryInfo.username || mock.mock('@cname'),
        sex: ((queryInfo.gender && queryInfo.gender == "女士") ? "1" : "0") ||
        "0",
        telephone: queryInfo.tel || mock.mock(/^[1][8][0-9]{9}$/)
    };

    var registurl = config.o2ourl + "/o2o/modifyAddress"
    interfaceModel.PostForm(req, registurl, address, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });
}


module.exports.delete = function (req, res, next) {

    var queryInfo = interfaceModel.getParameter(req);
    var address = {
        id: queryInfo.id
    };

    var registurl = config.o2ourl + "/o2o/delAddressById"
    interfaceModel.PostForm(req, registurl, address, function (body) {
        console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });
}

module.exports.get = function (req, res, next) {
    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    var address = {
        id: utils.GetUserInfo(req).id,
    };

    var registurl = config.o2ourl + "o2o/getAddressByMemberId";
    interfaceModel.PostForm(req, registurl, address, function (body) {
        // console.log(body)
        interfaceModel.sendJson(res, 200, body);
    }, function (err) {
        res.json(err);
    });

}


module.exports.validate = function (req, res, next) {
    if (!utils.GetUserInfo(req)) {
        interfaceModel.sendJson(res, 201, {"message": "请登录"});
    }
    interfaceModel.sendJson(res, 200, {"msg": "ok"});
}