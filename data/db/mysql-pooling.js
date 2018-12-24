var mysql = require("mysql");
var path = require('path');
var log = require(path.join(process.cwd(), 'weblogs/logs/log')).helper;
var config = require(path.join(process.cwd(), 'data/db/mysql-config'));
var model = require(path.join(process.cwd(), 'data/db/mysql-dataModel'));

/**
 * 创建连接池
 **/
var pool = mysql.createPool(config);


/**
 * 通过一条sql语句查询
 * sql sql查询语句
 * callback 回调函数
 **/
var query = function(sql,callback){
    if(!sql){
        if(typeof(callback) == "function") callback(model(0, "sql不能为空！"));
    }else{
        try{
            pool.getConnection(function(err,conn){
                if(err){
                    console.log("================================");
                    console.log("CONNECTION FAIL:", new Date());
                    console.log("================================");
                    log.writeErr(err);
                    if(typeof(callback) == "function") callback(model(0, err));
                }else{
                    conn.query(sql,function(err, results, fields){
                        if(err){
                            console.log('SELECT ERROR:',err.message);
                            log.writeErr(err);
                            if(typeof(callback)=="function") callback(model(0, err, sql));
                            return;
                        }
                        console.log("================================");
                        console.log('SELECT SUCCESS:', new Date());
                        console.log('results:', results);
                        console.log('fields:', fields);
                        console.log("================================");
                        log.writeInfo(results);
                        //释放连接
                        conn.release();
                        //事件驱动回调
                        if(typeof(callback) == "function") callback(model(1, results, sql));
                    });
                }
            });
        }catch(e){
            log.writeErr(err);
            if(typeof(callback)=="function") callback(model(0, e));
        }
    }
};

/**
 * 通过多条sql语句查询，会有事务回滚
 * sqlArr sql查询语句数组
 * callback 回调函数
 **/
var beginTransaction = function(sqlArr,callback){
    try{
        pool.getConnection(function(err,conn){
            if(err){
                console.log("CONNECTION FAIL," + new Date());
                log.writeErr(err);
                if(typeof(callback)=="function") callback(model(0, err));
            }else{
                conn.beginTransaction(function(err){
                    if(err){
                        log.writeErr(err);
                        throw err;
                        return ;
                    }
                    baseQuery(conn,sqlArr,callback);
                });
            }
        });
    }catch(e){
        log.writeErr(err);
        if(typeof(callback)=="function") callback(0,e);
    }


    function baseQuery(conn,sqlArr,callback){
        try{
            conn.query(sqlArr[0],function(err, results, fields){
                if (err) {
                    conn.rollback(function() {
                        log.writeErr(err);
                        throw err;
                    });
                    return ;
                }
                sqlArr.shift();
                if(sqlArr.length>0){
                    baseQuery(conn,sqlArr,callback);
                }else{
                    conn.commit(function(err) {
                        if (err) {
                            conn.rollback(function() {
                                log.writeErr(err);
                                throw err;
                            });
                            return ;
                        }
                        console.log("================================");
                        console.log('beginTransaction success!');
                        console.log("================================");
                        if(typeof(callback)=="function") callback(1,"SUCCESS");
                    });
                }
            });
        }catch(e){
            log.writeErr(err);
            if(typeof(callback)=="function") callback(0,e);
        }
    }
}

module.exports = {
    query:query,
    beginTransaction:beginTransaction
}