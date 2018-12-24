module.exports = function(status, results, sql){
    var returnObj = {
        status:status ? "success" : "fail"
    };
    if(returnObj.status == "fail"){
        returnObj.message = results||"系统错误！";
    }else{
        if(results instanceof Array){
            returnObj.data = [];
            for(var a= 0,a1=results.length;a<a1;a++){
                var obj = {};
                for(var key in results[a]){
                    obj[key] = results[a][key]||"";
                }
                returnObj.data.push(obj);
            }
        }else{
            returnObj.data = {};
            returnObj.data.affectedRows = results.affectedRows;
            returnObj.data.insertId = results.insertId;
            returnObj.data.changedRows = results.changedRows;
            returnObj.message = "操作成功";
        }
        //returnObj.fields = fields||"";
    }
    returnObj.sql = sql || "";
    console.log("================================");
    console.log(returnObj);
    console.log("================================");
    return returnObj;
}