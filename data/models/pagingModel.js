var path = require('path');
var config = require(path.join(process.cwd(), 'config'));
var baseModel = require(path.join(process.cwd(), 'data/models/baseModel'));

/**
 * 默认一页的记录数量
 **/
var _pageSize = 10;

/**
 * 分页对象的数据结构
 **/
function Paging(o){
    if(!o) o={};
    this.data = o.data;
    this.pageCurrent = parseInt(o.pageCurrent || 0+"");
    this.pageSize = parseInt(o.pageSize || _pageSize+"");
    this.total = parseInt(o.total || 0+"");
    this.pageCount = Math.ceil(this.total/this.pageSize);
}

/**
 * 返回分页中，一页的默认记录数量
 **/
function getPageSize(){
    return _pageSize;
}


/**
 * 分页
 **/
function getPagingInfo(o,callback){
    if(!o) o = {};
    console.log(o);

    baseModel.queryAllCount(o,function(data1){
        o.limit = {
            "pageSize": o.pageSize || _pageSize,
            "pageCurrent": o.pageCurrent||0
        };
        baseModel.queryAll(o,function(data2){
            if(typeof (callback) == "function"){
                callback(new Paging({
                    "data":data2.data,
                    "pageCurrent": o.pageCurrent,
                    "pageSize": o.pageSize,
                    "total": (data1.data&&data1.data.length>0)?data1.data[0].count:0
                }));
            }
        });
    });
}

module.exports = {
    getPagingInfo:getPagingInfo,
    getPageSize:getPageSize
}