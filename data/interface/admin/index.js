'use strict';

var express = require('express');

var menu = require('./menu');//菜单信息
var banner = require('./banner');//轮播图
var rules = require('./rules');//自助服务

var router = express.Router();


/**
 * 获取菜单信息
 * */
router.post('/menu/getMenuList', menu.getMenuList);


/**
 * 获取轮播图列表
 * */
router.post('/banner/getBannerList', banner.getBannerList);

/**
 * 添加轮播图
 * */
router.post('/banner/addBanner', banner.addBanner);
/**
 * 修改轮播图
 * */
router.post('/banner/updateBanner', banner.updateBanner);
/**
 * 删除轮播图
 * */
router.post('/banner/delBanner', banner.delBanner);



/**
 * 获取规则列表
 * */
router.post('/rules/isExistByName',rules.isExistByName);
/**
 * 获取标题
 * */
router.post('/rules/getRulesTable',rules.getRulesTable);
/**
 * 添加规章制度
 * */
router.post('/rules/addRules',rules.addRules);

/**
 * 添加规章制度
 * */
router.post('/rules/getRulesName',rules.getRulesName);
/**
 * 修改规章制度
 * */
router.post('/rules/modifyRules',rules.modifyRules);
/**
 * 删除规章制度
 * */
router.post('/rules/deleteRules',rules.deleteRules);

module.exports = router;