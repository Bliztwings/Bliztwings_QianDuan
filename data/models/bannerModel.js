var path = require('path');
var model = require(path.join(process.cwd(), 'data/db/mysql-dataModel'));
var baseModel = require(path.join(process.cwd(), 'data/models/baseModel'));
var guid = require(path.join(process.cwd(), 'data/tools/guid'));
var moment = require(path.join(process.cwd(), 'data/tools/moment'));
var pagingModel = require(path.join(process.cwd(), 'data/models/pagingModel'));
//表名
var tableName = "banner";
//字段数组
var tableField = ['id', 'name','seq','imgPath','jumpPath','target','validityDateStart','validityDateEnd'];

//构造器
function BannerInfo(banner){
    if(!banner) banner={};
    var time = moment().format("YYYY-MM-DD h:mm:ss");
    this.id = banner.id || guid();
    this.name = banner.name || "";
    this.seq = banner.seq || "1";
    this.imgPath = banner.imgPath || "";
    this.jumpPath = banner.jumpPath || "";
    this.target = banner.target || "";
    this.validityDateStart = banner.validityDateStart || time;
    this.validityDateEnd = banner.validityDateEnd || time;

    this.createDate = banner.createDate || time;
    this.createPeople = banner.createPeople || "";
    this.updateDate = banner.updateDate || time;
    this.updatePeople = banner.updatePeople || "";
    this.delSign = banner.delSign || 0;
}

//返回数据库里面的表名或者试图名
function getTableName(){
    return tableName;
}

/**
 * 通过id查询一条信息
 * id
 * callback 回调函数
 **/
function queryOneById(id,callback){
    baseModel.queryOne({
        "table":tableName,
        "field":"id",
        "fieldV":id
    },callback)
}

/**
 * 分页查询
 * o 查询参数
 * name 名称 模糊查询
 * imgPath 图片路径 模糊查询
 * jumpPath 跳转路径 模糊查询
 * callback 回调函数
 **/
function queryPaging(o,callback){
    if(!o) o={};
    var sql = "";
    if(o.name){
        sql += "and name like '%"+ o.name+"%'";
    }
    if(o.imgPath){
        sql += "and imgPath like '%"+ o.imgPath+"%'";
    }
    if(o.jumpPath){
        sql += "and jumpPath like '%"+ o.jumpPath+"%'";
    }
    if(o.createDateStart){
        sql += " and createDate >= " + o.createDateStart;
    }
    if(o.createDateEnd){
        sql += " and createDate <= " + o.createDateEnd;
    }
    if(o.validityDateStart){
        sql += " and validityDateStart >= " + o.validityDateStart;
    }
    if(o.validityDateEnd){
        sql += " and validityDateEnd <= " + o.validityDateEnd;
    }

    pagingModel.getPagingInfo({
        "table":tableName,
        "field":tableField,
        "sql":sql
    },callback);
}

/**
 * 新增一个banner记录
 * banner
 * callback 回调函数
 **/
function insert(banner,callback){
    if(!banner) banner={};
    var bannerInfo = new BannerInfo(banner);
    bannerInfo.updateDate = "";
    bannerInfo.updatePeople = "";
    baseModel.queryOne({
        "table":tableName,
        "field":"name",
        "fieldV":bannerInfo.name
    },function(o){
        if(o){
            if(o.status == "fail"){
                if(typeof(callback)=="function") callback(model(0,"插入失败!"));
            }else if(o.status == "success"){
                if(o.data.length>0){
                    if(typeof(callback)=="function") callback(model(0,"该名称的banner图已经存在!"));
                }else{
                    var newArr = [];
                    newArr.push(bannerInfo);
                    baseModel.insert({
                        "table":tableName,
                        "field":tableField,
                        "fieldV":newArr
                    },callback);
                }
            }
        }
    });
}

/**
 * 通过id删除一条记录
 * id
 * callback 回调函数
 **/
function del(id,callback){
    baseModel.del({
        "table":tableName,
        "field":"id",
        "fieldV":id
    },callback);
}

/**
 * 通过id修改一条记录
 * banner
 * callback 回调函数
 **/
function update(banner,callback){
    if(!banner) banner={};
    var bannerInfo = new BannerInfo(banner);
    delete bannerInfo.createDate;
    delete bannerInfo.createPeople;
    baseModel.update({
        "table":tableName,
        "field":"id",
        "fieldV":bannerInfo
    },callback);
}

module.exports={
    getTableName:getTableName,
    insert:insert,
    del:del,
    update:update,
    queryOneById:queryOneById,
    queryPaging:queryPaging,
}