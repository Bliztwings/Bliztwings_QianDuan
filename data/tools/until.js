//深度克隆
module.exports.cloneObj = function(obj){
    var str, newObj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    } else if (global.JSON) {
        str = JSON.stringify(obj), //序列化对象
            newObj = JSON.parse(str); //还原
    } else {
        for (var i in obj) {
            newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
    }
    return newObj;
}