var path = require('path');
var db = require(path.join(process.cwd(), 'data/db/mysql-pooling'));
var model = require(path.join(process.cwd(), 'data/db/mysql-dataModel'));

//通过语句直接操作数据库
function handleDb(sql,callback){
    if(!sql){
        if(typeof(callback)=="function") callback(model(0,"查询语句不能为空!"));
        return;
    }
    db.query(sql,function(data){
        if(typeof(callback)=="function") callback(data);
    });
}

//查询条数
//table为表名，字符串
//sql为限制条件，字符串
function queryAllCount(o,callback){
    if(!o) o={};
    if(!o.table){
        if(typeof(callback)=="function") callback(model(0,"表名不能为空!"));
        return;
    }
    var querySql = "select count(0) as count from "+ o.table+" where 1=1";
    if(o.sql){
        querySql += " and " + o.sql;
    }
    handleDb(querySql,callback);
}

//查询所有
//table为表名，字符串
//sql为限制条件，字符串
//limit位分页查询的参数
function queryAll(o,callback){
    if(!o) o={};
    if(!o.table){
        if(typeof(callback)=="function") callback(model(0,"表名不能为空!"));
        return;
    }
    var querySql = "select "+(o.field || "*")+" from "+ o.table+" where 1=1";
    if(o.sql){
        querySql += " and " + o.sql;
    }
    if(o.limit){
        if(!o.limit.pageSize){
            o.limit.pageSize=10;
        }
        o.limit.pageNo = o.limit.pageNo?o.limit.pageNo:1;
        querySql += " limit "+(o.limit.pageSize)*(o.limit.pageNo-1)+","+(o.limit.pageSize);
    }

    handleDb(querySql,callback);
}

//通过id查询一个
//table为表名，字符串
//field为字段名，字符串
//fieldV为字段值，字符串
function queryOne(o,callback){
    if(!o) o={};
    if(!o.table){
        if(typeof(callback)=="function") callback(model(0,"表名不能为空!"));
        return;
    }
    if(!o.field){
        if(typeof(callback)=="function") callback(model(0,"字段不能为空!"));
        return;
    }
    var querySql = "select * from "+o.table+" where "+o.field+"='"+(o.fieldV||0)+"' limit 1";
    handleDb(querySql,callback);
}

//新增
//table为表名
//field为字段名，数组
//fieldV为字段值，数组
function insert(o,callback){
    if(!o) o={};
    if(!o.table){
        if(typeof(callback)=="function") callback(model(0,"表名不能为空!"));
        return;
    }
    if(!o.field){
        if(typeof(callback)=="function") callback(model(0,"字段不能为空!"));
        return;
    }
    if(!o.fieldV) o.fieldV=[];

    var insertSql = "insert into "+ o.table+" ("+ o.field.join(",") +") value ";
    var arr=[];
    if(o.fieldV.length<=0){
        if(typeof(callback)=="function") callback(model(0,"插入的内容不能为空!"));
    }else{
        for(var a= 0,a1=o.fieldV.length;a<a1;a++){
            if(a>0){
                insertSql += ",";
            }
            arr=[];
            for(var b= 0,b1=o.field.length;b<b1;b++){
                arr.push(o.fieldV[a][o.field[b]]||"");
            }
            insertSql += "('"+arr.join("','")+"')";
        }
        handleDb(insertSql,callback);
    }
}

//通过id删除
//table为表名
//field为字段名，字符串
//fieldV为字段值，字符串或者数组
function del(o,callback){
    if(!o) o={};
    if(!o.table){
        if(typeof(callback)=="function") callback(model(0,"表名不能为空!"));
        return;
    }
    if(!o.field){
        if(typeof(callback)=="function") callback(model(0,"字段不能为空!"));
        return;
    }
    if(!o.fieldV){
        if(typeof(callback)=="function") callback(model(0,"字段值不能为空!"));
        return;
    }

    var deleteSql = "delete from "+ o.table+" where ";
    if(o.fieldV instanceof Array){
        deleteSql += o.field+" in ('"+o.fieldV.join("','")+"')";
    }else{
        deleteSql += o.field+"='"+o.fieldV+"'";
    }

    handleDb(deleteSql,callback);
}

//通过id修改
//table为表名
//field为字段名，字符串
//fieldV为字段值，对象
function update(o,callback){
    if(!o) o={};
    if(!o.table){
        if(typeof(callback)=="function") callback(model(0,"表名不能为空!"));
        return;
    }
    if(!o.field){
        if(typeof(callback)=="function") callback(model(0,"字段不能为空!"));
        return;
    }
    if(!o.fieldV) o.fieldV={};
    if(!o.fieldV[o.field]){
        if(typeof(callback)=="function") callback(model(0,"字段值不能为空!"));
        return;
    }

    var updateSql = "update "+ o.table+" set ";
    for(var key in o.fieldV){
        if(key != o.field){
            updateSql += key+"='"+o.fieldV[key]+"',";
        }
    }
    updateSql = updateSql.substring(0,updateSql.lastIndexOf(","));
    updateSql += " where "+o.field+"='"+o.fieldV[o.field]+"'";

    handleDb(updateSql,callback);
}

module.exports={
    handleDb:handleDb,
    insert:insert,
    del:del,
    update:update,
    queryAll:queryAll,
    queryOne:queryOne,
    queryAllCount:queryAllCount
}