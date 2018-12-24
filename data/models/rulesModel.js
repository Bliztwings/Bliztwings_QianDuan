var path = require('path');
var model = require(path.join(process.cwd(), 'data/db/mysql-dataModel'));
var baseModel = require(path.join(process.cwd(), 'data/models/baseModel'));
var guid = require(path.join(process.cwd(), 'data/tools/guid'));
var pagingModel = require(path.join(process.cwd(), 'data/models/pagingModel'));
//表名
var tableName = "ruleslist";
//字段数组
var tableField = ['id','pid','name','jumpPath','htmlInfo'];

//构造器
function RulesInfo(rules){
    if(!rules) rules={};
    this.id = rules.id || guid();
    this.pid = rules.pid || "";
    this.name = rules.name || "";
    this.jumpPath = rules.jumpPath || "";
    this.htmlInfo = rules.htmlInfo || "";
}

//返回数据库里面的表名或者试图名
function getTableName(){
    return tableName;
}



//通过id查询一条记录
function queryOneById(id,callback){
    baseModel.queryOne({
        "table":tableName,
        "field":"id",
        "fieldV":id
    },callback)
}
//通过name查询一条记录
function queryOneByName(name,callback){
    baseModel.queryOne({
        "table":tableName,
        "field":"name",
        "fieldV":name
    },callback)
}
//分页查询
function queryPaging(o,callback){
    if(!o) o={};
    pagingModel.getPagingInfo({
        "table":tableName,
        "field":tableField,
        "query":o
    },callback);
}


function queryAll(o,callback){
    if(!o) o={};
    baseModel.queryAll({
        "table":tableName,
    },callback);
}

//新增
function insert(rules,callback){
    if(!rules) rules={};
    var rulesInfo = new RulesInfo(rules);
    baseModel.queryOne(({
        "table":tableName,
        "field":"name",
        "fieldV":rulesInfo.name
    }),function(o){
        if(o){
            if(o.status == "fail"){
                if(typeof(callback)=="function") callback(model(0,"插入失败!"));
            }else if(o.status == "success"){
                if(o.data.length>0){
                    if(typeof(callback)=="function") callback(model(0,"该名称已经存在!"));
                }else{
                    var newArr = [];
                    newArr.push(rulesInfo);
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
function queryOne(rules,callback){
    if(!rules) rules={};
    var rulesInfo = new RulesInfo(rules);
    baseModel.queryOne(({
        "table":tableName,
        "field":"name",
        "fieldV":rulesInfo.name
    }),function(o){
        if(o){
            if(o.status == "success"){
                if(o.data.length>0){
                    if(typeof(callback)=="function") callback(model(0,"该名称已经存在!"));
                }else {
                    baseModel.queryOne(({
                        "table":tableName,
                        "field":"name",
                        "fieldV":rulesInfo.name
                    }),callback)
                }
            }
        }
    })
}
//通过id删除
function del(id,callback){
    baseModel.del({
        "table":tableName,
        "field":"id",
        "fieldV":id
    },callback);
}

//通过id修改
function update(rules,callback){
    if(!rules) rules={};
    console.log(rules);
    var rulesInfo = new RulesInfo(rules);
    baseModel.update({
        "table":tableName,
        "field":"id",
        "fieldV":rulesInfo
    },callback);
}

module.exports={
    getTableName:getTableName,
    insert:insert,
    del:del,
    update:update,
    queryOneById:queryOneById,
    queryPaging:queryPaging,
    queryAll:queryAll,
    queryOne:queryOne,
    queryOneByName:queryOneByName,
};